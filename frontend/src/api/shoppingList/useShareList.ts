import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ShareListRequestBody = {
  listId: string;
  participants: string[];
};

export const useShareList = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["share-list"],
    mutationFn: async (requestBody: ShareListRequestBody) => {
      const response = await axiosInstance.post(`/share/list`, requestBody);

      return response.data;
    },
    onSuccess: () => {
      toast.success("List shared successfully");
      queryClient.invalidateQueries({ queryKey: ["shared-lists"] });
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
    onError: () => {
      toast.error("Failed to share list");
    },
  });

  return mutation;
};
