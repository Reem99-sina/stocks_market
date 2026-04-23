import { useQuery } from "@tanstack/react-query";
import { StockChartParams } from "@/lib/stock-api";
import axios from "axios";

export const stocks = [
  "AAPL", "MSFT", "AMZN", "NVDA", "GOOGL",
  "META", "TSLA", "BRK.B", "JPM", "V"
];

export function useStock(symbol: string) {
  return useQuery({
    queryKey: ["stock", symbol],
    queryFn: async () => {
      const res = await axios.get(`/api/stock/symbol?symbol=${symbol}`);
      return res.data;
    },
    refetchInterval: 15 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useCompany({ symbol, from, to }: StockChartParams) {
  return useQuery({
    queryKey: ["chart", symbol, from, to],
    queryFn: async () => {
      const res = await axios.get(
        `/api/stock/company?symbol=${symbol}&from=${from}&to=${to}`,
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    refetchInterval: false,
  });
}

export function useMarketNews(category: string = "general") {
  return useQuery({
    queryKey: ["market", category],
    queryFn: async () => {
      const res = await axios.get(`/api/stock/new?category=${category}`);
      return res.data;
    },
  });
}
export function useMarketStocks() {
  return useQuery({
    queryKey: ["market-stocks"],
    queryFn: async () => {
      const res = await axios.get("/api/stock/market");
      return res.data;
    },
    staleTime: 60 * 1000,
  });
}
export function getCategoryColor(category?: string) {
  switch (category?.toLowerCase()) {
    case "top news":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";

    case "business":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";

    case "forex":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";

    case "crypto":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";

    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
}
export function getSectorColor(sector: string) {
  const map: Record<string, string> = {
    Technology: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
    Retail: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
    Semiconductors:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
    Media: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200",
    Automobiles:
      "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200",
    "Financial Services":
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
    Banking:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200",
  };

  return (
    map[sector] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
  );
}
