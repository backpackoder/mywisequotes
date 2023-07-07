import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const authorTranslations = await prisma.authorTranslation.findMany({
    // orderBy: {
    // },
  });

  return NextResponse.json(authorTranslations);
}

export async function POST(req: Request) {
  const data = await req.json();

  const authorTranslations = await prisma.authorTranslation.create({
    data,
  });

  return NextResponse.json(authorTranslations);
}
