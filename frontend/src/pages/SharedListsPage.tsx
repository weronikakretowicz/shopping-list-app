import { useDeleteFromSharedList } from "@/api/shoppingList/useDeleteFromSharedList.ts";
import { useGetSharedList } from "@/api/shoppingList/useGetSharedList";
import { useUpdateList } from "@/api/shoppingList/useUpdateList";
import Layout from "@/components/Layout.tsx";
import { ListCard } from "@/components/ListCard.tsx";
import { REFRESH_INTERVAL } from "@/constants/intervals";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./routes";

const SharedListsPage = () => {
  const { data: lists, isLoading, error } = useGetSharedList(REFRESH_INTERVAL);
  const { handleItemStatusChange } = useUpdateList(lists ?? []);
  const navigate = useNavigate();
  const deleteListMutation = useDeleteFromSharedList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout breadcrumbs={[{ label: "Shared List", path: ROUTES.SHAREDLISTS }]}>
      <div className="flex w-full h-full">
        <div className={clsx("flex flex-row flex-wrap h-full", "overflow-y-auto gap-4 px-4 py-3")}>
          {lists?.map((list) => (
            <ListCard
              key={list._id}
              list={list}
              onItemStatusChange={handleItemStatusChange}
              onEditClick={() => navigate(ROUTES.EDIT_SHAREDLISTS.replace(":id", list._id))}
              onDeleteClick={() => deleteListMutation.mutate(list._id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SharedListsPage;
