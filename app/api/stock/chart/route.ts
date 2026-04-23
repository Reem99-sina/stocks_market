import { NextResponse } from "next/server";
import finnhub from "finnhub";
import { profile } from "../market/route";

const finnhubClient = new finnhub.DefaultApi(process.env.NEXT_PUBLIC_API_KEY!);
function getEarnings(symbol: string) {
  return new Promise((resolve, reject) => {
    finnhubClient.companyEarnings(
      symbol,
      { limit: 10 },
      (error: Error, data: unknown) => {
        if (error) reject(error);
        else resolve(data);
      }
    );
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol") || "AAPL";

    const [stock, detail] = await Promise.all([
      getEarnings(symbol),
      profile(symbol),
    ]);

    return NextResponse.json({
      stock,
      detail,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
