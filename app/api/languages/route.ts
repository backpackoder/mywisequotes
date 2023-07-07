import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const language = await prisma.language.findMany({
    include: {
      authors: true,
      tags: true,
      quotes: true,
    },

    orderBy: {
      code: "asc",
    },
  });

  const count = language.length;

  const data = {
    count,
    data: language,
  };

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const language = await prisma.language.create({
    data,
  });

  return NextResponse.json(language);
}
