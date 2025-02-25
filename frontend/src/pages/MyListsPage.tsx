import { AppSidebar } from "@/components/AppSidebar.tsx";
import Layout from "@/components/Layout.tsx";
import { Button } from "@/components/ui/button.tsx";
import AppHeader from "@/pages/AppHeader.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { ListCard } from "@/components/ListCard";
import clsx from "clsx";
import { throttle } from "lodash-es";
import { useCallback } from "react";
import { useDeleteList } from "@/api/shoppingList/useDeleteList";
import { ROUTES } from "./routes";

type List = {
  _id: string;
  name: string;
  items: {
    name: string;
    quantity: number;
    unit: string;
    bought: boolean;
    _id: string;
  }[];
  owner: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const getLists = async () => {
  const response = await axiosInstance.get<{ message: string; lists: List[] }>("/list/all");

  return response.data.lists;
};

const MyListsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteListMutation = useDeleteList();

  const breadcrumbItems = [{ label: "My Lists" }, { label: "My lol" }, { label: "My dupa" }];

  const handleNewList = () => {
    navigate("/newList");
  };

  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
  });

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

  return (
    <Layout>
      <div className="flex w-full h-full">
        <AppSidebar currUrl="/myLists" />
        <div className="flex flex-col w-full h-full justify-start items-start">
          <div className="flex flex-row justify-between items-center w-full sticky top-0 z-10 bg-white dark:bg-gray-800">
            <AppHeader breadcrumbItems={breadcrumbItems} />

            <Button variant="ghost" className="p-2 cursor-pointer" onClick={handleNewList}>
              <PlusIcon className="w-6 h-6" />
            </Button>
          </div>

          <div className={clsx("flex flex-row flex-wrap h-full", "overflow-y-auto gap-4 px-4 py-3")}>
            {lists?.map((list) => (
              <ListCard
                key={list._id}
                list={list}
                onItemStatusChange={handleItemStatusChange}
                onEditClick={() => navigate(ROUTES.EDIT_LIST.replace(":id", list._id))}
                onDeleteClick={() => deleteListMutation.mutate(list._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyListsPage;
