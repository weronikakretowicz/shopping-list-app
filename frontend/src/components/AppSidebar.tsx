import { useNavigate } from "react-router-dom";
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
import { ClipboardDocumentListIcon, ClipboardIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";
import { ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import SignOutDialog from "@/components/SignOutDialog.tsx";

type AppSidebarProps = {
  currUrl?: string;
};

const items = [
  {
    title: "My Lists",
    url: "/myLists",
    icon: <ClipboardDocumentListIcon />,
  },
  {
    title: "Shared Lists",
    url: "/sharedLists",
    icon: <ClipboardIcon />,
  },
];

export const AppSidebar = ({ currUrl = "" }: AppSidebarProps) => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate("/profile");
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
                      (currUrl === "/myLists" && item.title === "My Lists") ||
                      (currUrl === "/sharedLists" && item.title === "Shared Lists")
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
                      <span className="font-bold">Username</span>
                      <span className="text-muted">user@example.com</span>
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
