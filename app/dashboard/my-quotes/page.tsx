import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Commons
import { ROUTES } from "@/commons/commons";

export default async function MyQuotes() {
  const session = await getServerSession();

  if (!session) {
    redirect(ROUTES.SIGN_IN);
  }

  return <div>MyQuotes page</div>;
}
