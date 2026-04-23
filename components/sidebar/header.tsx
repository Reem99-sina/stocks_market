"use client";
import { usePathname } from "next/navigation";
import { DarkLight } from "../provider/darkOrLight";

export function Header() {
  const path = usePathname();

  const config = {
    "/dashboard/stocks": {
      title: "Stocks Detail",
      description: "Live stock prices and company overview",
    },
    "/dashboard/watchlist": {
      title: "Watchlist",
      description: "Your saved stocks",
    },
    "/dashboard/markets": {
      title: "Market Overview",
      description: "Real-time market data",
    },
    "/dashboard/portfolio": {
      title: "My Portfolio",
      description: "My Portfolio of stocks",
    },
    "/dashboard/stock": {
      title: "Stocks Detail",
      description: "Live stock prices and company overview",
    },
     "/dashboard/news": {
      title: "News",
      description: "Stay updated with the latest financial and global news",
    },
  };

  const current = config[path as keyof typeof config];

  return (
    <div className="mb-6 flex items-center justify-between px-3">
      <div>
        <h1 className="text-2xl font-bold">{current?.title || "Dashboard"}</h1>

        <p className="text-sm text-muted-foreground">
          {current?.description || "Track stocks and company insights"}
        </p>
      </div>

      <DarkLight />
    </div>
  );
}
