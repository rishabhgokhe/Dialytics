import {
  Calendar,
  Home,
  icons,
  Inbox,
  Search,
  Settings,
  HelpCircleIcon,
  GitGraph,
  NotebookTabsIcon,
} from "lucide-react";

export const SideBarMainItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Metrics",
    url: "/metrics",
    icon: GitGraph,
  },
  {
    title: "Report",
    url: "/report",
    icon: NotebookTabsIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];
export const SideBarHelpItems = [
  {
    title: "Help Center",
    url: "#",
    icon: HelpCircleIcon,
  },
  {
    title: "Logout",
    url: "/",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
