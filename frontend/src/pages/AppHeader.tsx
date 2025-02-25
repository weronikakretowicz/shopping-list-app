// import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BellIcon } from "@heroicons/react/24/outline";
import React from "react";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type AppHeaderProps = {
  breadcrumbItems?: BreadcrumbItem[];
};

const AppHeader = ({ breadcrumbItems = [] }: AppHeaderProps) => {
  // const navigate = useNavigate();

  return (
    <div className="w-full px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <Breadcrumb>
          <BreadcrumbList>
            {/*<BreadcrumbItem>*/}
            {/*    <BreadcrumbLink href="/myLists">My Lists</BreadcrumbLink>*/}
            {/*</BreadcrumbItem>*/}
            {/*<BreadcrumbSeparator />*/}
            {/*<BreadcrumbItem>*/}
            {/*    <BreadcrumbLink href="/components">Components</BreadcrumbLink>*/}
            {/*</BreadcrumbItem>*/}
            {/*<BreadcrumbSeparator />*/}
            {/*<BreadcrumbItem>*/}
            {/*    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>*/}
            {/*</BreadcrumbItem>*/}

            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index === breadcrumbItems.length - 1 || !item.path ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={item.path}
                      // onClick={(e) => {
                      //     e.preventDefault();
                      //     navigate(item.path);
                      // }}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index !== breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Button variant="ghost" className="p-2">
        <BellIcon className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default AppHeader;
