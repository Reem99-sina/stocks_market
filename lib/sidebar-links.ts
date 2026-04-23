import {
  Home,
  TrendingUp,
  Briefcase,
  LineChart,
  Star,
  Newspaper,
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Markets",
    href: "/dashboard/markets",
    icon: TrendingUp,
  },
  {
    title: "Portfolio",
    href: "/dashboard/portfolio",
    icon: Briefcase,
  },
  {
    title: "Stock Page",
    href: "/dashboard/stock",
    icon: LineChart,
  },
  {
    title: "Watchlist",
    href: "/dashboard/watchlist",
    icon: Star,
  },
  {
    title: "News",
    href: "/dashboard/news",
    icon: Newspaper,
  },
];