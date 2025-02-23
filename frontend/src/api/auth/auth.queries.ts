import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance.ts";
import { handleError } from "@/utils/handleError";
import toast from "react-hot-toast";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UpdatePasswordPayload,
} from "@/api/auth/auth.types.ts";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterPayload): Promise<void> => {
      await axiosInstance.post("/users/register", data);
    },
    onSuccess: () => {
      toast.success("You can now log in");
    },
    onError: handleError,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginPayload): Promise<AuthResponse> => {
      const response = await axiosInstance.post("/users/login", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("You are now logged in.");
    },
    onError: handleError,
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data: UpdatePasswordPayload): Promise<void> => {
      await axiosInstance.put("/Auth/UpdatePassword", data);
    },
    onSuccess: () => {
      toast.success("Your password has been successfully updated.");
    },
    onError: handleError,
  });
};
