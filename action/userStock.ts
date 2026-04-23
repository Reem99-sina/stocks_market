import { addStockData, addStockWatchlistData, stockPayment } from "@/types/comapny";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useMyStock() {
  return useQuery({
    queryKey: ["protfolio"],
    queryFn: async () => {
      const res = await axios.get(`/api/portfolio/`);
      return res.data;
    },
  });
}

export const useAddStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dataStock: addStockData) => {
      const { data } = await axios.post("/api/portfolio/", {
        ...dataStock,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["protfolio"],
      });
    },
  });
};



export const usePaymetStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dataStock:stockPayment) => {
      const { data } = await axios.post("/api/checkout/", {
        ...dataStock,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["protfolio"],
      });
    },
  });
};

export const useDeletePaymetStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({id}:{id:string}) => {
      const { data } = await axios.delete(`/api/portfolio?id=${id}`);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["protfolio"],
      });
    },
  });
};


export function useMyStockWatchlist() {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const res = await axios.get(`/api/watchlist/`);
      return res.data;
    },
  });
}

export const useAddStockWatchlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dataStock: addStockWatchlistData) => {
      const { data } = await axios.post("/api/watchlist/", {
        ...dataStock,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });
};

export function useChartStock({symbol}:{symbol:string}) {
  return useQuery({
    queryKey: ["chart",symbol],
    queryFn: async () => {
      const res = await axios.get(`/api/stock/chart?symbol=${symbol}`);
      return res.data;
    },
  });
}