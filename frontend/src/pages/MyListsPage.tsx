import { AppSidebar } from "@/components/AppSidebar.tsx";
import Layout from "@/components/Layout.tsx";
import { Button } from "@/components/ui/button.tsx";
import AppHeader from "@/pages/AppHeader.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const MyListsPage = () => {
  const navigate = useNavigate();

  const breadcrumbItems = [{ label: "My Lists" }, { label: "My lol" }, { label: "My dupa" }];

  const handleNewList = () => {
    navigate("/newList");
  };

  return (
    <Layout>
      <div className="flex w-screen h-screen ">
        <AppSidebar currUrl="/myLists" />
        <div className="flex flex-col w-full h-full justify-start items-start">
          <AppHeader breadcrumbItems={breadcrumbItems} />
          <div className="flex w-full h-full px-4 py-3 justify-end items-start">
            <Button variant="ghost" className="p-2" onClick={handleNewList}>
              <PlusIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyListsPage;
