"use client";

import { useMyStockWatchlist } from "@/action/userStock";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/lib/pagination";
import { StockWatchlistItem } from "@/types/comapny";
import {  useState } from "react";

export default function Watchlistpage() {
  const { data: dataWatchlist } = useMyStockWatchlist();
  const [page, setPage] = useState(1);
  const limit = 15;

  //   const detailStock= useMemo(() => {
  //     return (symbol) => useStock(symbol);
  //   }, []);

  const {
    data: NewPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = usePagination(dataWatchlist, page, limit);

  return (
    <div className="flex flex-col mb-4 px-4 gap-4">

      <Table className="w-full">
        <TableHeader>
          <TableRow>
          
              <TableHead>Symbol</TableHead>
              <TableHead>price</TableHead>
               <TableHead>Added At</TableHead>
           
          </TableRow>
        </TableHeader>

        <TableBody>
          {NewPage?.map((item: StockWatchlistItem) => (
            <TableRow key={item.id}>
              {/* Symbol */}
              <TableCell >{item.symbol}</TableCell>
              <TableCell>{item.buyPrice}</TableCell>
               {/* Created At */}
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
