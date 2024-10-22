import { AppSidebar } from "@/components/Elements/app-sidebar";
import CallLogDashboard from "@/components/Dashboard/Dashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <CallLogDashboard />
    </SidebarProvider>
  );
}
