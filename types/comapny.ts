type NewsCategory = "top news" | "business" | "forex" | "crypto";

export interface CompanyNews {
  category: string;
  datetime: number; // unix timestamp (seconds)
  headline: string;
  id: number;
  image: string;
  related: string; // stock symbol (e.g. AAPL)
  source: string;
  summary: string;
  url: string;
}

export interface MarketNews {
  id: number;
  headline: string;
  summary: string;
  url: string;
  image: string;
  source: string;
  datetime: number;
  category?: NewsCategory;
  related: string;
}

export interface MarketStock {
  symbol: string;
  name: string;
  sector: string;
  marketCap: number;
  logo: string;
  price: number;
  change: number;
  percent: number;
}

export type addStockData = {
  symbol: string;
  buyPrice: number;
   quantity: number;
};

export type addStockWatchlistData = {
  symbol: string;
  buyPrice: number;

};

export type stockPayment = {
  stock: MarketStock;
  quantity: number;
};

export interface PortfolioItem {
  id: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  userId: string;
  createdAt: string;
}

export interface StockWatchlistItem {
  id: string;
  symbol: string;

  buyPrice: number;
  userId: string;
  createdAt: string;
}

export interface StockEarnings {
  actual: number;
  estimate: number;
  period: string; // "2025-03-31"
  quarter: number;
  surprise: number;
  surprisePercent: number;
  symbol: string;
  year: number;
}

export interface CompanyProfile {
  name: string;
  finnhubIndustry: string;
  marketCapitalization: number;
  logo: string;
  country?: string;
  currency?: string;
  ticker?: string;
  weburl?: string;
}

export interface StockQuote {
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number; // high
  l: number; // low
  o: number; // open
  pc: number; // previous close
}