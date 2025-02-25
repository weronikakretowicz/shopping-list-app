import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export function useDeleteList() {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
        mutationFn: (id: string) => axiosInstance.delete(`/list/${id}`),
        mutationKey: ['deleteList'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists'] });
        },
        onError: (error: Error) => {
            console.error('Delete error:', error);
        },
    });
  
    return mutation;
  }