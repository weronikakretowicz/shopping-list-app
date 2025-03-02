import { useGetUserDetails } from "@/api/user/useGetUserDetails.ts";
import SignOutDialog from "@/components/SignOutDialog.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/pages/routes.ts";
import { ClipboardDocumentListIcon, ClipboardIcon, UserIcon } from "@heroicons/react/24/outline";
import { ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AppSidebarProps = {
  currUrl?: string;
};

const items = [
  {
    title: "My Lists",
    url: ROUTES.MYLISTS,
    icon: <ClipboardDocumentListIcon />,
  },
  {
    title: "Shared Lists",
    url: ROUTES.SHAREDLISTS,
    icon: <ClipboardIcon />,
  },
];

export const AppSidebar = ({ currUrl = "" }: AppSidebarProps) => {
  const { data } = useGetUserDetails();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate(ROUTES.USER_PAGE);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CoList</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      (currUrl === ROUTES.MYLISTS && item.title === "My Lists") ||
                      (currUrl === ROUTES.SHAREDLISTS && item.title === "Shared Lists")
                    }
                  >
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center justify-between w-full p-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/assets/avatar-image.jpg" alt="User Avatar" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="font-bold">{data?.name ?? "Username"}</span>
                      <span className="text-muted">{data?.email ?? "user@example.com"}</span>
                    </div>
                  </div>
                  <ChevronUp className="w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" sideOffset={24} className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={handleAccountClick}>
                  <UserIcon className="w-5 h-5" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SignOutDialog triggerClassName="flex items-center gap-2 cursor-pointer" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
