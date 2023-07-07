import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// Utils
import { authOptions } from "@/utils/authOptions";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  const user = currentUserEmail
    ? await prisma.user.findUnique({
        where: { email: currentUserEmail },
      })
    : null;

  const settings =
    user &&
    (await prisma.userSettings.findFirst({
      where: { userId: user.id },
    }));

  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  const data = await req.json();

  const user = await prisma.user.findFirst({
    where: { email: currentUserEmail },
  });

  const settings =
    user &&
    (await prisma.userSettings.update({
      where: { userId: user.id },
      data,
    }));

  return NextResponse.json(settings);
}
