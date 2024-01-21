import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Napoleon");
  const data = res;

  return NextResponse.json(data);
}
