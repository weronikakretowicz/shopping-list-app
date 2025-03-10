import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";

type UsernameAndEmail = {
  username: string;
  email: string;
};

export const useUpdateUsernameAndEmail = () => {
  const queryClient = useQueryClient();

  const updateUsernameAndEmailMutation = useMutation({
    mutationKey: ["updateUsernameAndEmail"],
    mutationFn: async (data: UsernameAndEmail) => {
      const response = await axiosInstance.put("/user/updateUsernameAndEmail", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Username and email updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update username and email");
    },
  });

  return {
    updateUsernameAndEmailMutation,
    isError: updateUsernameAndEmailMutation.isError,
  };
};
