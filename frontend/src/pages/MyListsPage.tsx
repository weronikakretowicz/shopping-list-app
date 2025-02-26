import { useDeleteList } from "@/api/shoppingList/useDeleteList";
import { useGetUserList } from "@/api/shoppingList/useGetUserList";
import { useUpdateList } from "@/api/shoppingList/useUpdateList";
import Layout from "@/components/Layout.tsx";
import { ListCard } from "@/components/ListCard";
import { REFRESH_INTERVAL } from "@/constants/intervals";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./routes";

const MyListsPage = () => {
  const navigate = useNavigate();
  const deleteListMutation = useDeleteList();
  const { lists, isLoading, error } = useGetUserList(REFRESH_INTERVAL);

  const { handleItemStatusChange } = useUpdateList(lists ?? []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout breadcrumbs={[{ label: "My List", path: ROUTES.MYLISTS }]}>
      <div className="flex w-full h-full">
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
    </Layout>
  );
};

export default MyListsPage;
