import { NextResponse } from "next/server";
import finnhub from "finnhub";
import { stocks } from "@/action/marketOverview";
import { CompanyProfile, StockQuote } from "@/types/comapny";


const api_key = process.env.NEXT_PUBLIC_API_KEY!;
const finnhubClient = new finnhub.DefaultApi(api_key);
type StockDataTuple = [CompanyProfile | null, StockQuote | null];

// helper
function quote(symbol: string) {
  return new Promise((resolve) => {
    finnhubClient.quote(symbol, (error: Error, data: Response) => {
      if (error) resolve(null);
      else resolve(data);
    });
  });
}

export function profile(symbol: string) {
  return new Promise((resolve) => {
    finnhubClient.companyProfile2({ symbol }, (error: Error, data: Response) => {
      if (error) resolve(null);
      else resolve(data);
    });
  });
}

export async function GET() {
  try {
    const results = await Promise.all(
      stocks.map(async (symbol) => {
        const [p, q]= await Promise.all([
          profile(symbol),
          quote(symbol),
        ]) as StockDataTuple

        return {
          symbol,
          name: p?.name,
          sector: p?.finnhubIndustry,
          marketCap: p?.marketCapitalization,
          logo: p?.logo,
          // quote data (PRICE)
          price: q?.c,
          change: q?.d,
          percent: q?.dp,
        };
      })
    );

    return NextResponse.json(results);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}