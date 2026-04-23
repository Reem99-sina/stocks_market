import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getAuthSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { symbol, quantity, buyPrice } = body;
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "no user found" }, { status: 401 });
    }
    const portfolio = await prisma.portfolio.create({
      data: {
        symbol,
        quantity,
        buyPrice,
        userId: user?.id,
      },
    });

    return NextResponse.json(portfolio);
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
  const data = await prisma.portfolio.findMany({
    where: { userId: user?.id },
  });

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
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

  await prisma.portfolio.deleteMany({
    where: {
      userId: user?.id,
      id: id || "",
    },
  });

  return NextResponse.json({ success: true });
}
