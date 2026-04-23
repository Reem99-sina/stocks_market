import { NextResponse } from "next/server";
import finnhub from "finnhub";
import { responseEncoding } from "axios";

const api_key = process.env.NEXT_PUBLIC_API_KEY!;
console.log(api_key, "api_key");
const finnhubClient = new finnhub.DefaultApi(api_key);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // optional category (default = general)
    const category = searchParams.get("category") || "general";

    const data = await new Promise((resolve, reject) => {
      finnhubClient.marketNews(
        category,
        {},
        (error: Error, response: responseEncoding) => {
          if (error) reject(error);
          else resolve(response);
        },
      );
    });

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
