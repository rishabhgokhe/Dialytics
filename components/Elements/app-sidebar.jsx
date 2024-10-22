import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarHelpItems, SideBarMainItems } from "@/Data/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react"; // Make sure to import your icons as needed

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarMainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filters Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center space-x-2">
                    <FilterIcon className="h-5 w-5" />
                    <Input placeholder="Search..." className="w-full" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Add more filter options as needed */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="outline" className="w-full">
                    Apply Filters
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Audio Playback Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Audio Playback</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="outline" className="w-full">
                    Play
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="outline" className="w-full">
                    Pause
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="outline" className="w-full">
                    Stop
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* You can add more playback controls, like skip, volume control, etc. */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Help</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarHelpItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}