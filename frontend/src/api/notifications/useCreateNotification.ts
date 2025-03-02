import axiosInstance from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";

type CreateNotificationRequestBody = {
  receiverEmail: string;
  listId: string;
  actionType: "added" | "modified";
  isRead?: boolean;
  timestamp?: string;
};

export const useCreateNotification = () => {
  const mutation = useMutation({
    mutationKey: ["createNotification"],
    mutationFn: async (requestBody: CreateNotificationRequestBody) => {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      const response = await axiosInstance.post(`/notification/create`, requestBody);

      return response.data;
    },
  });

  return mutation;
};
