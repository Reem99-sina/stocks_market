import { NextResponse } from "next/server";
import finnhub from "finnhub";

const api_key = process.env.NEXT_PUBLIC_API_KEY!;

const finnhubClient = new finnhub.DefaultApi(api_key);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");

    if (!symbol) {
      return NextResponse.json(
        { error: "symbol is required" },
        { status: 400 },
      );
    }

    const data = await new Promise((resolve, reject) => {
      finnhubClient.quote(symbol, (error: Error, response: Response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
