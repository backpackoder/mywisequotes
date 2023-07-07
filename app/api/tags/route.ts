import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const tag = await prisma.tag.findMany({
    // orderBy: {
    // },
  });

  return NextResponse.json(tag);
}

export async function POST(req: Request) {
  const data = await req.json();

  const tag = await prisma.tag.create({
    data,
  });

  return NextResponse.json(tag);
}
