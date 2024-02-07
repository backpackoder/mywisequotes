import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const authors = await prisma.author.findMany();

  return NextResponse.json(authors);
}

export async function POST(req: Request) {
  const data = await req.json();

  const authors = await prisma.author.create({
    data,
  });

  return NextResponse.json(authors);
}
