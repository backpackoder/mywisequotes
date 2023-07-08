import { NextResponse } from "next/server";

// Utils
import { getWikiData } from "@/utils/getWikiData";

export async function GET(req: Request, { params }: { params: { author: string } }) {
  const author = await getWikiData(params.author);

  return NextResponse.json(author);
}
