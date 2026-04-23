"use client";
import { getCategoryColor, useMarketNews } from "@/action/marketOverview";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/lib/pagination";
import { MarketNews } from "@/types/comapny";
import { useState } from "react";

export default function NewsPage() {
  const { data: marketNews } = useMarketNews("general");
  const [page, setPage] = useState(1);
  const limit = 15;

  const {
    data: NewPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = usePagination(marketNews, page, limit);

  return (
    <div className="flex flex-col  mb-4 px-4 gap-4">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Headline</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {NewPage?.map((item: MarketNews) => (
            <TableRow key={item.id}>
              <TableCell className="text-sm">{item.source}</TableCell>

              <TableCell>
                <a
                  href={item.url}
                  target="_blank"
                  className="hover:underline line-clamp-2"
                >
                  {item.headline}
                </a>
              </TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded ${getCategoryColor(
                    item.category,
                  )}`}
                >
                  {item.category}
                </span>
              </TableCell>

              <TableCell className="text-xs text-muted-foreground">
                {new Date(item.datetime * 1000).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
