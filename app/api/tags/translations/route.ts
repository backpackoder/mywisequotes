import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const tagTranslation = await prisma.tagTranslation.findMany({
    // orderBy: {
    // },
  });

  return NextResponse.json(tagTranslation);
}

export async function POST(req: Request) {
  const data = await req.json();

  const tagTranslation = await prisma.tagTranslation.create({
    data,
  });

  return NextResponse.json(tagTranslation);
}
