import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

type ActionType = "added" | "modified";

type NotificationItem = {
  _id: string;
  senderId: {
    _id: string;
    username: string;
  };
  receiverId: {
    _id: string;
    username: string;
  };
  isRead: boolean;
  listId: {
    _id: string;
    name: string;
  };
  actionType: ActionType;
  timestamp: string;
  __v: number;
};

type NotificationsResponse = {
  message: string;
  notifications: NotificationItem[];
};

export const useGetNotifications = (refetchInterval: number) => {
  const getNotifications = async () => {
    const response = await axiosInstance.get<NotificationsResponse>("/notifications/all");

    return response.data.notifications;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: refetchInterval,
  });

  return { data, ...rest };
};
