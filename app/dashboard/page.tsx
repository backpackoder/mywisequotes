import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Utils
import { authOptions } from "@/utils/authOptions";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import UserProfile from "@/components/userProfile/UserProfile";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(ROUTES.SIGN_IN);
  }

  const user = await prisma.user.findUnique({ where: { email: session?.user?.email ?? "" } });

  const isProfileMine = session?.user?.email === user?.email;

  return user && <UserProfile user={user} isProfileMine={isProfileMine} />;
}
