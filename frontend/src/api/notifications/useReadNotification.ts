import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ReadNotificationRequestBody = {
  notificationId: string;
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["readNotification"],
    mutationFn: async (requestBody: ReadNotificationRequestBody) => {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      const response = await axiosInstance.post(`/notification/read`, requestBody);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readNotification"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to read notification");
    },
  });

  return mutation;
};
