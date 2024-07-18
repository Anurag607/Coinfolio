import React from "react";
import {
  CalendarIcon,
  HomeIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Statistics",
    href: "/stats",
    icon: <ChartBarIcon className="w-6 h-6" />,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];
