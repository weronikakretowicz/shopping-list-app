import { useGetNotifications } from "@/api/notifications/useGetNotifications.ts";
import { useReadNotification } from "@/api/notifications/useReadNotification.ts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { REFRESH_INTERVAL } from "@/constants/intervals.ts";
import { BellIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

type ActionType = "added" | "modified";

type Notification = {
  _id: string;
  senderId: {
    _id: string;
    username: string;
  };
  receiverId: {
    _id: string;
    username: string;
  };
  isRead: boolean;
  listId: {
    _id: string;
    name: string;
  };
  actionType: ActionType;
  timestamp: string;
  __v: number;
};

export type BreadCrumbItem = {
  label: string;
  path: string;
};

type AppHeaderProps = {
  breadcrumbItems?: BreadCrumbItem[];
};

const getActionResult = (notification: Notification | undefined) => {
  if (!notification) {
    return null;
  }

  // return notification.actionType === "added"
  //   ? `has added you to the "${notification.listId.name}" list`
  //   : `has modified the "${notification.listId.name}" list`;
  return notification.actionType === "added" ? "has added you to the list" : "has modified the list";
};

const AppHeader = ({ breadcrumbItems = [] }: AppHeaderProps) => {
  const navigate = useNavigate();
  const { data: notifications, refetch } = useGetNotifications(REFRESH_INTERVAL);
  const { mutate: readNotification } = useReadNotification();
  const [open, setOpen] = useState(false);

  const displayNotification = (notification: Notification | undefined) => {
    const notificationResult = getActionResult(notification);
    if (!notification || !notificationResult) {
      return null;
    }

    return (
      <div className="flex flex-col bg-white">
        <span className="p-1 text-sm">{`${notification.senderId.username} ${notificationResult}`}</span>
        <hr className="border-gray-200 dark:border-gray-700 my-1" />
      </div>
    );
  };

  const handleRead = () => {
    if (notifications) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      notifications.forEach((notification) => {
        readNotification({ notificationId: notification._id });
      });
    }
    refetch();
    setOpen(false);
  };

  return (
    <div className="w-full relative px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Fragment key={index}>
                <BreadcrumbItem>
                  {index === breadcrumbItems.length - 1 || !item.path ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.path);
                      }}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index !== breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="flex relative items-center cursor-pointer"
        onClick={() => notifications && notifications.length > 0 && setOpen(!open)}
      >
        <Button variant="ghost" className="p-2 ">
          <BellIcon style={{ width: "20px", height: "20px" }} />
        </Button>
        {notifications && notifications.length > 0 && (
          <div className="flex absolute w-3.5 h-3.5 top-1.5 right-1.5 bg-red-600 text-secondary rounded-full p-1 text-xs  items-center justify-center">
            {notifications.length}
          </div>
        )}
      </div>

      {open && (
        <div className="flex flex-col p-2 absolute top-12 right-4 text-primary font-light border max-h-44 overflow-y-scroll">
          {/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
          {notifications && notifications.map((n) => displayNotification(n))}
          <Button className="btn-notifications" onClick={() => handleRead()}>
            Mark as read
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppHeader;
