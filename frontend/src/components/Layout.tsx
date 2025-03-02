import AppHeader, { type BreadCrumbItem } from "@/components/AppHeader.tsx";
import { AppSidebar } from "@/components/AppSidebar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ROUTES } from "@/pages/routes.ts";
import { PlusIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type LayoutProps = {
  breadcrumbs: BreadCrumbItem[];
  children: ReactNode;
};

export default function Layout({ breadcrumbs, children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // const generateBreadcrumbItems = (currentPath: string) => {
  //   const segments = currentPath.split("/").filter((segment) => segment !== "");
  //   const items: { label: string; path: string }[] = [];
  //   let pathToSegment = "";
  //
  //   const processSegments = async () => {
  //     for (let i = 0; i < segments.length; i++) {
  //       const segment = segments[i];
  //       pathToSegment += `/${segment}`;
  //
  //       let label = segment.replace(/[-_]/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  //
  //       if (i === 1 && segments[0] === "myLists" && segment.length === 25) {
  //         const { list } = useGetListName(segment);
  //         if (list) {
  //           label = list.name;
  //         }
  //       }
  //
  //       items.push({
  //         label: label,
  //         path: pathToSegment,
  //       });
  //     }
  //
  //     if (items.length === 0 && currentPath !== "/") {
  //       setBreadcrumbItems([{ label: "myLists", path: "myLists" }]);
  //     } else {
  //       setBreadcrumbItems(items);
  //     }
  //   };
  //
  //   processSegments();
  // };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   generateBreadcrumbItems(location.pathname);
  // }, [location.pathname]);

  const handleNewList = () => {
    navigate(ROUTES.NEWLIST);
  };

  const shouldShowPlusIcon = location.pathname === ROUTES.MYLISTS;

  return (
    <SidebarProvider>
      <main className="flex min-w-full min-h-full">
        <AppSidebar currUrl={location.pathname} />
        <div className="flex flex-col w-full h-full justify-start items-start">
          <div className="flex flex-row justify-between items-center w-full sticky top-0 z-10 bg-white dark:bg-gray-800">
            <AppHeader breadcrumbItems={breadcrumbs} />

            {shouldShowPlusIcon && (
              <Button variant="ghost" className="p-2 cursor-pointer" onClick={handleNewList}>
                <PlusIcon className="w-6 h-6" />
              </Button>
            )}
          </div>

          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
