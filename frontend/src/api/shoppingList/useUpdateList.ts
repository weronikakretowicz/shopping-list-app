import type { List, ListItem } from "@/types/List.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { throttle } from "lodash-es";
import { useCallback } from "react";
import axiosInstance from "../axiosInstance";

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleItemStatusChange = useCallback(
    throttle((listId: string, itemId: string, checked: boolean) => {
      const list = lists?.find((l) => l._id === listId);

      if (!list) {
        return;
      }

      const updatedItems = list.items.map((item: ListItem) =>
        item._id === itemId ? { ...item, bought: checked } : item,
      );

      const updatedList = {
        name: list.name,
        updatedAt: new Date().toISOString(),
        items: updatedItems,
      };
      updateListMutation.mutate({ listId, updatedList });
    }, 1000),
    [lists, updateListMutation],
  );

  return { handleItemStatusChange };
};
