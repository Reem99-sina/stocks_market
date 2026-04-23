"use client";

import { useStock } from "@/action/marketOverview";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export function StockCard({ symbol }: { symbol: string }) {
  const { data, isLoading } = useStock(symbol);

  const price = data?.c;
  const change = data?.d;
  const percent = data?.dp;

  const isPositive = change >= 0;

  return (
    <div
      className="
        p-5 rounded-2xl border  shadow-sm
        hover:shadow-lg transition-all duration-300
        w-full
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">{symbol}</h2>

        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      {/* Price */}
      {isLoading ? (
        <p className="mt-4 text-gray-400">Loading...</p>
      ) : (
        <>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-2xl font-bold">${price}</p>

            <div
              className={`
                flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium
                ${isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
              `}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}

              {percent?.toFixed(2)}%
            </div>
          </div>

          {/* Change */}
          <p
            className={`mt-2 text-sm ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change} today
          </p>
        </>
      )}
    </div>
  );
}