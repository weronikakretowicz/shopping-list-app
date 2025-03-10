// biome-ignore lint/style/useImportType: <explanation>
import { List } from "@/types/List";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useGetUserList = (refetchInterval: number) => {
  const getLists = async () => {
    const response = await axiosInstance.get<{ message: string; lists: List[] }>("/list/all");

    return response.data.lists;
  };

  const { data: lists, ...rest } = useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
    refetchInterval: refetchInterval,
  });

  return { lists, ...rest };
};
