import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const tag = await prisma.tag.findMany();

  const count = tag.length;

  const data = {
    count,
    data: tag,
  };

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const tag = await prisma.tag.create({
    data,
  });

  return NextResponse.json(tag);
}
