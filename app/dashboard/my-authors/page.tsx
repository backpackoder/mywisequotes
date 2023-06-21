import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Commons
import { ROUTES } from "@/commons/commons";

export default async function MyAuthors() {
  const session = await getServerSession();

  if (!session) {
    redirect(ROUTES.SIGN_IN);
  }

  return <div>MyAuthors page</div>;
}
