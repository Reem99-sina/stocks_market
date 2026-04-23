"use client";

import { stocks } from "@/action/marketOverview";
import { useChartStock } from "@/action/userStock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StockEarnings } from "@/types/comapny";
import Image from "next/image";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function StockPage() {
  const [stock, setStock] = useState("AAPL");
  const { data } = useChartStock({ symbol: stock });
  const chartData = data?.stock?.map((item:StockEarnings) => ({
    period: item.period,
    actual: item.actual,
    estimate: item.estimate,
  }));
  
  return (
    <div className="w-full px-3 flex flex-col gap-5 justify-center">
      <Select value={stock} onValueChange={setStock}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Select stocks" />
        </SelectTrigger>

        <SelectContent>
          {stocks?.map((ele, index) => (
            <SelectItem value={ele} key={index}>
              {ele}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {data?.detail && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4   bg-foreground">
          {/* Company Info */}
          <div className="flex items-center gap-3">
            <Image
              src={data.detail.logo}
              className="w-12 h-12 rounded-full"
              alt="logo"
              width={48}
              height={48}
            />
            <div>
              <h2 className="text-lg font-bold ">{data.detail.name}</h2>
              <p className="text-sm text-gray-700">
                {data.detail.ticker} • {data.detail.exchange}
              </p>
            </div>
          </div>

          {/* Market Info */}
          <div className="text-sm space-y-1">
            <p>
              <span className="text-gray-700">Country:</span>{" "}
              {data.detail.country}
            </p>
            <p>
              <span className="text-gray-700">Industry:</span>{" "}
              {data.detail.finnhubIndustry}
            </p>
            <p>
              <span className="text-gray-700">Currency:</span>{" "}
              {data.detail.currency}
            </p>
            <p>
              <span className="text-gray-700">IPO:</span> {data.detail.ipo}
            </p>
          </div>

          {/* Market Cap */}
          <div className="text-sm space-y-1">
            <p>
              <span className="text-gray-700">Market Cap:</span>{" "}
              {(data.detail.marketCapitalization / 1000).toFixed(2)}B
            </p>
            <p>
              <span className="text-gray-700">Shares:</span>{" "}
              {data.detail.shareOutstanding}M
            </p>
            <a
              href={data.detail.weburl}
              target="_blank"
              className="text-blue-500 underline"
            >
              Visit Website
            </a>
          </div>
        </div>
      )}
      <div className="w-full h-87.5 md:h-120">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* actual earnings */}
            <Line
              type="monotone"
              dataKey="actual"
              strokeWidth={2}
              stroke="#22c55e"
            />

            {/* estimated earnings */}
            <Line
              type="monotone"
              dataKey="estimate"
              strokeWidth={2}
              stroke="#f59e0b"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
