import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import { useState } from "react";

import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ShoppingListItem = {
  bought: boolean;
  name: string;
  quantity: number;
  unit: string;
  _id: string;
};

type ShoppingList = {
  _id: string;
  name: string;
  items: ShoppingListItem[];
  updatedAt: string;
  createdAt: string;
};

// Function to fetch shopping lists
const fetchLists = async (): Promise<ShoppingList[]> => {
  const response = await axiosInstance.get("/list");
  console.log(response);

  // Assuming your backend responds with { data: { data: [...] } }
  return response.data.data ?? [];
};

// Function to create a new list
const createList = async (newListName: string): Promise<ShoppingList> => {
  const response = await axiosInstance.post("/list", {
    name: newListName,
    items: [],
  });
  return response.data.list;
};

export const Board = () => {
  const [newListName, setNewListName] = useState("");
  const queryClient = useQueryClient();

  // Use TanStack Query's useQuery hook to fetch lists
  const {
    data: lists,
    isLoading,
    isError,
  } = useQuery<ShoppingList[]>({
    queryFn: fetchLists,
    queryKey: ["list"],
  });

  // Use useMutation for creating a new list, and invalidate the query on success
  const { mutate: addList } = useMutation({
    mutationFn: createList,
    mutationKey: ["createList"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  const handleCreateList = () => {
    if (!newListName.trim()) {
      return;
    }

    addList(newListName);
    setNewListName("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading lists.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      {/* New Note Input */}
      <div className="flex mb-6">
        <Input
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New note title"
          className="mr-2"
        />
        <Button onClick={handleCreateList}>Add Note</Button>
      </div>

      {/* Grid of Note Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {lists?.map((list) => (
          <Card key={list._id} className="p-4">
            <h2 className="text-xl font-semibold">{list.name}</h2>
            {list.items && list.items.length > 0 ? (
              <ul className="mt-2">
                {list.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No items</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
