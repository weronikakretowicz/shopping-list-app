import { List } from "@/components/ListCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { throttle } from "lodash-es";
import { useCallback } from "react";

export const useUpdateList = (lists: List[]) => {
    const queryClient = useQueryClient();

    const updateListMutation = useMutation({
        mutationFn: async ({ listId, updatedList }: { listId: string; updatedList: Partial<List> }) => {
            return axiosInstance.put(`/list/${listId}`, updatedList);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lists"] });
        },
    });

    const handleItemStatusChange = useCallback(
        throttle((listId: string, itemId: string, checked: boolean) => {
            const list = lists?.find((l) => l._id === listId);

            if (!list) return;

            const updatedItems = list.items.map((item) =>
                item._id === itemId ? { ...item, bought: checked } : item
            );

            const updatedList = {
                name: list.name,
                updatedAt: new Date().toISOString(),
                items: updatedItems,
            };
            updateListMutation.mutate({ listId, updatedList });
        }, 1000),
        [lists, updateListMutation]
    );

    return { handleItemStatusChange };
};