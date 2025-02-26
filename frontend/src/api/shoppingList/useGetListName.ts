import type { List } from "@/types/List";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useGetListName = (listId: string) => {
  const getListName = async () => {
    const response = await axiosInstance.get<List>(`/list/${listId}`);

    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["list", listId],
    queryFn: getListName,
    enabled: !!listId,
  });

  return {
    list: data,
    isLoading,
    isError,
    error,
  };
};
