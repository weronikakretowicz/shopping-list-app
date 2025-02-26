import axiosInstance from "@/api/axiosInstance.ts";
import type { List } from "@/types/List.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetListById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["list", id],
    queryFn: async () => {
      const response = await axiosInstance.get<List>(`/list/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
