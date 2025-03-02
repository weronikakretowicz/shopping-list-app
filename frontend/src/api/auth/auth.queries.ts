import type { AuthResponse, LoginPayload, RegisterPayload, UpdatePasswordPayload } from "@/api/auth/auth.types.ts";
import axiosInstance from "@/api/axiosInstance.ts";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterPayload): Promise<void> => {
      await axiosInstance.post("/users/register", data);
    },
    onSuccess: () => {
      toast.success("You can now log in");
    },
    onError: () => {
      toast.error("Failed to register");
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginPayload): Promise<AuthResponse> => {
      const response = await axiosInstance.post("/users/login", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("You are now logged in.");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: async (data: UpdatePasswordPayload): Promise<void> => {
      await axiosInstance.put("/Auth/UpdatePassword", data);
    },
    onSuccess: () => {
      toast.success("Your password has been successfully updated.");
    },
    onError: () => {
      toast.error("Failed to update password");
    },
  });
};
