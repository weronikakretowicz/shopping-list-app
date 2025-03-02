import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCreateNotification } from "../notifications/useCreateNotification";

type ShareListRequestBody = {
  listId: string;
  participants: string[];
};

export const useShareList = () => {
  const queryClient = useQueryClient();
  const createNotification = useCreateNotification();

  const mutation = useMutation({
    mutationKey: ["share-list"],
    mutationFn: async (requestBody: ShareListRequestBody) => {
      const response = await axiosInstance.post(`/share/list`, requestBody);

      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success("List shared successfully");
      queryClient.invalidateQueries({ queryKey: ["shared-lists"] });
      queryClient.invalidateQueries({ queryKey: ["list"] });

      variables.participants.forEach((participant) => {
        createNotification.mutate({
          receiverEmail: participant,
          listId: variables.listId,
          actionType: "added",
        });
      });
    },
    onError: () => {
      toast.error("Failed to share list");
    },
  });

  return mutation;
};
