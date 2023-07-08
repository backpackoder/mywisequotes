import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request) {
  const quote = await prisma.quote.findMany({
    include: PRISMA_CALLS.quotes.include,
  });

  const count = quote.length;

  const data = {
    data: quote,
    count,
  };

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const quote = await prisma.quote.create({
    data,
  });

  return NextResponse.json(quote);
}
