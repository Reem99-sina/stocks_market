"use client";

import { useMarketStocks, getSectorColor } from "@/action/marketOverview";
import { Bookmark, BookmarkCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/lib/pagination";
import { MarketStock } from "@/types/comapny";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AddModelProtfolio } from "@/components/market/addModelPortfolio";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useAddStock,
  useAddStockWatchlist,
  useMyStockWatchlist,
} from "@/action/userStock";
import { handleApiRequest } from "@/lib/apiHandle";

export default function MarketsPage() {
  const { data: stocks } = useMarketStocks();
  const { data: dataWatchlist } = useMyStockWatchlist();
  const params = useSearchParams();
  const hasRun = useRef(false);
  const router = useRouter();
  const stockParam = params.get("stock");
  const { mutateAsync } = useAddStock();
  const { mutateAsync: mutateAsyncWatchlist } = useAddStockWatchlist();
  const stock = stockParam ? JSON.parse(decodeURIComponent(stockParam)) : null;
  const [selectedStock, setSelectedStock] = useState<MarketStock | null>(null);
  const [page, setPage] = useState(1);
  const limit = 15;

  const {
    data: NewPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = usePagination(stocks, page, limit);

  const addProtfolio = async () => {
    const result = await handleApiRequest(() =>
      mutateAsync({
        symbol: stock?.name,
        quantity: stock?.quantity,
        buyPrice: stock?.price * stock?.quantity,
      }),
    );
    if (!result) return;
    router.push("/dashboard/markets");
  };

  const addWatchlist = async (item: MarketStock) => {
    const result = await handleApiRequest(() =>
      mutateAsyncWatchlist({
        symbol: item.name,
        buyPrice: item.price,
      }),
    );
    if (!result) return;
  };

  const watchlist = useMemo(() => {
    return (symbol: string) =>
      dataWatchlist?.find((item:MarketStock) => item.symbol == symbol);
  }, [dataWatchlist]);

  useEffect(() => {
    if (!stock) return;
    if (hasRun.current) return;
    hasRun.current = true;
    addProtfolio();
  }, [stock]);

  return (
    <div className="flex flex-col mb-4 px-4 gap-4">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>%</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {NewPage?.map((item: MarketStock) => (
            <TableRow key={item.symbol}>
              {/* Company */}
              <TableCell className="flex items-center gap-2">
                {item.logo && (
                  <Image
                    src={item.logo}
                    className="w-6 h-6 rounded-full"
                    alt="logo"
                    width={24}
                    height={24}
                  />
                )}
                {item.name}
              </TableCell>

              {/* Symbol */}
              <TableCell className="font-medium">{item.symbol}</TableCell>

              {/* Sector */}
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded ${getSectorColor(
                    item.sector,
                  )}`}
                >
                  {item.sector}
                </span>
              </TableCell>

              {/* Price */}
              <TableCell>${item.price?.toFixed(2)}</TableCell>

              {/* Change */}
              <TableCell
                className={item.change > 0 ? "text-green-500" : "text-red-500"}
              >
                {item.change}
              </TableCell>

              <TableCell
                className={item.percent > 0 ? "text-green-500" : "text-red-500"}
              >
                {item.percent?.toFixed(2)}%
              </TableCell>

              <TableCell>
                <button
                  onClick={() => setSelectedStock(item)}
                  className="px-2 py-1 text-xs  text-white rounded bg-sidebar"
                >
                  Add
                </button>
              </TableCell>
              <TableCell>
                <button
                  onClick={async () => addWatchlist(item)}
                  className="hover:scale-110 transition"
                >
                  {watchlist(item?.name) ? (
                    <BookmarkCheck className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddModelProtfolio
        stock={selectedStock}
        onClose={() => setSelectedStock(null)}
      />
      {/* Pagination */}
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
