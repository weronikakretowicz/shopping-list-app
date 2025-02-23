// import {Header} from "@/components/Header.tsx";
import Layout from "@/components/Layout.tsx";
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
// import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
// import {AppSidebar} from "@/components/AppSidebar.tsx";


const MyListsPage = () => {
    return (
        <Layout>
            <div className="flex w-screen h-screen">
                <AppSidebar currUrl="/myLists"/>
                <div className="flex m-2 justify-between">
                    <SidebarTrigger/>
                </div>
            </div>
        </Layout>
    );
}

export default MyListsPage;