import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { symbol, buyPrice } = body;

    const session = await getAuthSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "no user found" }, { status: 401 });
    }

    // 🔍 Check if already exists
    const existing = await prisma.watchlist.findFirst({
      where: {
        userId: user.id,
        symbol: symbol,
      },
    });

    // ❌ If exists → delete it
    if (existing) {
      await prisma.watchlist.delete({
        where: { id: existing.id },
      });

      return NextResponse.json({ action: "removed" });
    }

    // ✅ If not → create it
    const watch = await prisma.watchlist.create({
      data: {
        symbol,
        userId: user.id,
        buyPrice,
      },
    });

    return NextResponse.json({ action: "added", data: watch });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "no user found" }, { status: 401 });
  }
  const data = await prisma.watchlist.findMany({
    where: { userId: user?.id },
  });

  return NextResponse.json(data);
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "no user found" }, { status: 401 });
  }
  await prisma.watchlist.deleteMany({
    where: {
      userId: user?.id,
      symbol: symbol || "",
    },
  });

  return NextResponse.json({ success: true });
}
