import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type CreateNotificationRequestBody = {
  senderId: string;
  receiverId: string;
  listId: string;
  actionType: string;
  isRead?: boolean;
  timestamp?: string;
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["createNotification"],
    mutationFn: async (requestBody: CreateNotificationRequestBody) => {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      const response = await axiosInstance.post(`/notification/create`, requestBody);

      return response.data;
    },
    onSuccess: () => {
      toast.success("Notification created successfully!");
      queryClient.invalidateQueries({ queryKey: ["createNotification"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to create notification");
    },
  });

  return mutation;
};
