import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  // const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  // defaultOpen={defaultOpen}
  return (
    <SidebarProvider>
      {/*<AppSidebar />*/}
      <main>
        {/*<SidebarTrigger/>*/}
        {children}
      </main>
    </SidebarProvider>
  );
}
