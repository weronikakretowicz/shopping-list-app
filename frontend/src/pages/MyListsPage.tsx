import { AppSidebar } from "@/components/AppSidebar.tsx";
import Layout from "@/components/Layout.tsx";
import { Button } from "@/components/ui/button.tsx";
import AppHeader from "@/pages/AppHeader.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ListCard } from "@/components/ListCard";
import clsx from "clsx";
import { ROUTES } from "./routes";
import { useDeleteList } from "@/api/shoppingList/useDeleteList";
import { useUpdateList } from "@/api/shoppingList/useUpdateList";
import { useGetUserList } from "@/api/shoppingList/useGetUserList";
import { REFRESH_INTERVAL } from "@/constants/intervals";
const MyListsPage = () => {
  const navigate = useNavigate();
  const deleteListMutation = useDeleteList();

  const breadcrumbItems = [{ label: "My Lists" }, { label: "My lol" }, { label: "My dupa" }];

  const handleNewList = () => {
    navigate("/newList");
  };

  const { lists, isLoading, error } = useGetUserList(REFRESH_INTERVAL);

  const { handleItemStatusChange } = useUpdateList(lists ?? []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
