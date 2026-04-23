"use client";
import { useDeletePaymetStock, useMyStock } from "@/action/userStock";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/lib/pagination";
import { PortfolioItem } from "@/types/comapny";
import { useState } from "react";

export default function PortfolioPage() {
  const { data } = useMyStock();
  const { mutateAsync } = useDeletePaymetStock();
  const [page, setPage] = useState(1);
  const limit = 15;

  const {
    data: NewPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = usePagination(data, page, limit);

  const handleDelete = async (id: string) => {
    try {
      const result = await mutateAsync({ id: id });
      if (!result) return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10 px-3">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {NewPage?.map((item: PortfolioItem) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.symbol}</TableCell>

              <TableCell>{item.quantity}</TableCell>

              <TableCell>${item.buyPrice.toFixed(2)}</TableCell>

              <TableCell>
                ${(item.buyPrice * item.quantity).toFixed(2)}
              </TableCell>

              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-sm hover:text-black text-sm"
                >
                  Delete
                </button>
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
