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


export const callLogs = [
  {
    dateTime: "25-10-2024 14:30",
    agent: "Aarav Sharma",
    duration: "5:23",
    sentiment: "Positive",
  },
  {
    dateTime: "25-10-2024 15:45",
    agent: "Ananya Patel",
    duration: "3:17",
    sentiment: "Neutral",
  },
  {
    dateTime: "25-10-2024 16:20",
    agent: "Rohan Gupta",
    duration: "8:02",
    sentiment: "Negative",
  },
  {
    dateTime: "24-10-2024 13:10",
    agent: "Sanya Singh",
    duration: "7:45",
    sentiment: "Positive",
  },
  {
    dateTime: "24-10-2024 12:50",
    agent: "Vikram Desai",
    duration: "4:12",
    sentiment: "Neutral",
  },
  {
    dateTime: "23-10-2024 11:30",
    agent: "Meera Khan",
    duration: "6:34",
    sentiment: "Negative",
  },
  {
    dateTime: "22-10-2024 10:00",
    agent: "Rajiv Mehta",
    duration: "5:55",
    sentiment: "Positive",
  },
  {
    dateTime: "21-10-2024 09:45",
    agent: "Kavita Nair",
    duration: "3:38",
    sentiment: "Neutral",
  },
];