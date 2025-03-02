import axiosInstance from "@/api/axiosInstance.ts";
import type { AddListPayload } from "@/api/shoppingList/shoppingList.types.ts";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddList = () => {
  return useMutation({
    mutationKey: ["addList"],
    mutationFn: async (data: AddListPayload): Promise<void> => {
      await axiosInstance.post("/list", data);
    },
    onSuccess: () => {
      toast.success("Your list has been added successfully!");
    },
    onError: () => {
      toast.error("Failed to add list");
    },
  });
};
