import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFromSharedList() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/shared/delete/${id}`),
    mutationKey: ["delete-shared-list"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-shared-lists"] });
    },
    onError: (error: Error) => {
      console.error("Delete error:", error);
    },
  });

  return mutation;
}
