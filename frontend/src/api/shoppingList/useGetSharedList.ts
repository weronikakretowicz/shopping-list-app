import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { List } from "@/types/List";

export const useGetSharedList = (fetchInterval: number) => {
    const query = useQuery({
        queryKey: ["get-shared-lists"],
        queryFn: async () => {
            const response = await axiosInstance.get<{ shoppingLists: List[] }>("/shared");

            return response.data.shoppingLists ?? [];
        },
        refetchInterval: fetchInterval,
    });

    return query;
};