import Layout from "@/components/Layout.tsx";
import { AppSidebar } from "@/components/AppSidebar.tsx";
import AppHeader from "@/pages/AppHeader.tsx";
import { useGetSharedList } from "@/api/shoppingList/useGetSharedList";
import { ListCard } from "@/components/ListCard.tsx";
import { useUpdateList } from "@/api/shoppingList/useUpdateList";
import { ROUTES } from "./routes";
import { useNavigate } from "react-router-dom";
import { useDeleteList } from "@/api/shoppingList/useDeleteList";
import { REFRESH_INTERVAL } from "@/constants/intervals";

const SharedListsPage = () => {
  const breadcrumbItems = [{ label: "Shared Lists" }];
  const { data: lists, isLoading, error } = useGetSharedList(REFRESH_INTERVAL);
  const { handleItemStatusChange } = useUpdateList(lists ?? []);
  const navigate = useNavigate();
  const deleteListMutation = useDeleteList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <div className="flex w-screen h-full flex-col">
        <div className="flex w-full justify-start items-start">
          <AppSidebar currUrl="/sharedLists" />

          <div className="flex w-full h-full flex-col">
            <div className="flex w-full justify-start items-start">
              <AppHeader breadcrumbItems={breadcrumbItems} />
            </div>

            <div className="flex w-full h-full justify-start items-start px-4 py-2">
              {lists?.map((list) => (
                <ListCard key={list._id} list={list} onItemStatusChange={handleItemStatusChange}
                  onEditClick={() => navigate(ROUTES.EDIT_LIST.replace(":id", list._id))}
                  onDeleteClick={() => deleteListMutation.mutate(list._id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SharedListsPage;
