import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type AlphaFunction =
  | "TIME_SERIES_INTRADAY"
  | "TIME_SERIES_DAILY"
  | "TIME_SERIES_WEEKLY"
  | "GLOBAL_QUOTE"
  | "SYMBOL_SEARCH";

export type GetStockParams = {
  //   function: AlphaFunction;
  symbol?: string;
  //   interval?: string;
  //   keywords?: string;
};
export type StockChartParams = {
  symbol: string;
  from?: Date|number;
  to?: Date|number;   
};
const url = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
export const getStockData = async (params: GetStockParams) => {
  const res = await axios.get(url!, {
    params: {
      ...params,
      token: API_KEY,
    },
  });

  return res.data;
};
export const getStockChart = async (params:StockChartParams) => {
  const res = await axios.get(`https://finnhub.io/api/v1/stock/candle`, {
    params: {
      ...params,
      token: API_KEY,
    },
  });

  return res.data;
};
