import { NextResponse } from "next/server";
import finnhub from "finnhub";
import { CompanyNews } from "@/types/comapny";

const api_key = process.env.NEXT_PUBLIC_API_KEY || "";

const client = new finnhub.DefaultApi(api_key);

function toDate(ts?: string | null) {
  if (!ts) return "";
  return new Date(Number(ts) * 1000).toISOString().split("T")[0];
}

function getCompanyNews(
  symbol: string,
  from: string,
  to: string
): Promise<CompanyNews[]> {
  return new Promise((resolve, reject) => {
    client.companyNews(symbol, from, to, (error: Error, data: CompanyNews[]) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const symbol = searchParams.get("symbol") || "AAPL";

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const fromDate = toDate(from);
    const toDateStr = toDate(to);

    const data = await getCompanyNews(symbol, fromDate, toDateStr);

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
