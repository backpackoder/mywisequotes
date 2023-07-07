import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { id }: { id: string }) {
  const quote = await prisma.quote.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  return NextResponse.json(quote);
}

export async function POST(req: Request) {
  const data = await req.json();

  const quote = await prisma.quote.create({
    data,
  });

  return NextResponse.json(quote);
}
