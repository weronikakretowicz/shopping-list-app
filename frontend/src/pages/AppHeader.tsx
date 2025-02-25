import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
// import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type AppHeaderProps = {
  breadcrumbItems?: BreadcrumbItem[];
};

const AppHeader = ({ breadcrumbItems = [] }: AppHeaderProps) => {
  // const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotifications", (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, actionType }) => {
    const action = actionType === "added" ? "has added you to the list" : "has modified the list";

    return <span className="p-1 text-sm">{`${senderName} ${action}`}</span>;
  };

  return (
    <div className="w-full relative px-4 py-3 flex items-center justify-between">
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

      <div className="flex relative items-center cursor-pointer">
        <Button variant="ghost" className="p-2 ">
          <BellIcon style={{ width: "20px", height: "20px" }} />
        </Button>
        <div className="flex absolute w-3.5 h-3.5 top-1.5 right-1.5 bg-red-600 text-secondary rounded-full p-1 text-xs  items-center justify-center">
          2
        </div>
      </div>
      <div className="flex flex-col p-2 absolute top-12 right-0 text-primary font-light">
        {notifications.map((n) => displayNotification(n))}
      </div>
    </div>
  );
};

export default AppHeader;
