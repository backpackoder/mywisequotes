import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const tags = await prisma.tag.findMany({
    include: {
      translations: {
        include: {
          language: true,
        },
      },
      quotes: true,
    },
  });

  const count = tags.length;

  const data = {
    count,
    data: tags,
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
