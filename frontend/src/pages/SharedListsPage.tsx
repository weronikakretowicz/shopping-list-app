// import {Header} from "@/components/Header.tsx";
import Layout from "@/components/Layout.tsx";
import { AppSidebar } from "@/components/AppSidebar.tsx";
// import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppHeader from "@/pages/AppHeader.tsx";
// import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
// import {AppSidebar} from "@/components/AppSidebar.tsx";

const SharedListsPage = () => {
  const breadcrumbItems = [{ label: "Shared Lists" }];

  return (
    <Layout>
      <div className="flex w-screen h-screen">
        <AppSidebar currUrl="/sharedLists" />
        <div className="flex w-full h-full justify-start items-start">
          <AppHeader breadcrumbItems={breadcrumbItems} />
        </div>
      </div>
    </Layout>
  );
};

export default SharedListsPage;
