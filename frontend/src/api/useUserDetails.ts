import axiosInstance from "@/api/axiosInstance.ts";
import { useQuery } from "@tanstack/react-query";

type UserDetails = {
  name: string;
  email: string;
  createdAt: string;
};

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const result = await axiosInstance.get<UserDetails>("/user/details");

      return result.data;
    },
  });
};
