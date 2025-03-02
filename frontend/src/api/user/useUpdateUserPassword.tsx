import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";

type Passwords = {
  oldPassword: string;
  newPassword: string;
};

export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();

  const updateUserPasswordMutation = useMutation({
    mutationKey: ["updateUserPassword"],
    mutationFn: async (data: Passwords) => {
      const response = await axiosInstance.put("/user/updateUserPassword", data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Password updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update password");
    },
  });

  return {
    updateUserPasswordMutation,
    isError: updateUserPasswordMutation.isError,
  };
};
