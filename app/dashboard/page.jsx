import { AppSidebar } from "@/components/Elements/app-sidebar";
import CallLogDashboard from "@/components/Dashboard/Dashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="text-lg font-bold p-4  text-black rounded-lg bg-gray-300 mt-4 ml-3" />
      <CallLogDashboard />
    </SidebarProvider>
  );
}
