"use client";

import { useCompany } from "@/action/marketOverview";
import { StockCard } from "@/components/stock/StockCard";
import { usePagination } from "@/lib/pagination";
import { CompanyNews } from "@/types/comapny";
import Image from "next/image";
import { useState } from "react";

function toDateInput(ts: number) {
  return new Date(ts * 1000).toISOString().split("T")[0];
}

function fromDateInput(dateStr: string) {
  return Math.floor(new Date(dateStr).getTime() / 1000);
}

export default function Dashboard() {
  const stocks = ["AAPL", "TSLA", "NVDA", "AMZN"];
  const [symbol, setSymbol] = useState("AAPL");
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState(
    () => Math.floor(Date.now() / 1000) - 3600 * 24 * 7,
  );

  const [to, setTo] = useState(() => Math.floor(Date.now() / 1000));

  const { data } = useCompany({
    symbol,
    from,
    to,
  });
  const {
    data: NewPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = usePagination(data, page, 5);

  return (
    <div className="min-h-screen px-4 py-6">
      {/* DATE FILTERS */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="text-xs mx-3 text-gray-500">From</label>
          <input
            type="date"
            className="border p-2 rounded-lg text-sm"
            value={toDateInput(from)}
            onChange={(e) => setFrom(fromDateInput(e.target.value))}
          />
        </div>

        <div>
          <label className="text-xs mx-3 text-gray-500">To</label>
          <input
            type="date"
            className="border p-2 rounded-lg text-sm"
            value={toDateInput(to)}
            onChange={(e) => setTo(fromDateInput(e.target.value))}
          />
        </div>
      </div>

      {/* STOCK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 mb-8">
        {stocks.map((s) => (
          <div
            key={s}
            onClick={() => setSymbol(s)}
            className={`cursor-pointer transition hover:scale-[1.02] ${
              symbol === s ? "ring-2 ring-purple-500 rounded-xl" : ""
            }`}
          >
            <StockCard symbol={s} />
          </div>
        ))}
      </div>

      <div className="mt-6  rounded-2xl shadow p-5">
        <h2 className="font-semibold text-gray-400 mb-4">
          Latest Company News
        </h2>

        <div className="space-y-4">
          {NewPage?.length === 0 && (
            <p className="text-sm text-gray-400">No news available</p>
          )}

          {NewPage?.map((item: CompanyNews) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex gap-4 p-4 rounded-lg border hover:bg-gray-50 transition"
            >
              {/* IMAGE */}
              {item.image && (
                <Image
                  src={item.image}
                  alt="news"
                  className="w-20 h-20 object-cover rounded-lg"
                  width={80}
                  height={80}
                />
              )}

              {/* CONTENT */}
              <div className="flex-1">
                <h3 className="font-medium text-sm text-gray-500 line-clamp-2">
                  {item.headline}
                </h3>

                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex justify-between mt-2 text-xs text-gray-300">
                  <span>{item.source}</span>
                  <span>
                    {new Date(item.datetime * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={!hasPrevPage}
          className="px-3 py-1 border rounded-lg disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className="px-3 py-1 border rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
