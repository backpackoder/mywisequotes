import { prisma } from "@/lib/prisma";

// Components
import { BreadCrumb, SVG_Home } from "@/components/navbars/BreadCrumb";
import UserCard from "@/components/UserCard";

// Commons
import { ROUTES } from "@/commons/commons";

export default async function Users() {
  const users = await prisma.user.findMany();

  const breadcrumbItems = [
    {
      name: "Home",
      href: ROUTES.DASHBOARD,
      svg: <SVG_Home />,
      current: false,
    },
    {
      name: "Users",
      href: ROUTES.USERS,
      current: false,
    },
  ];

  return (
    <section className="flex flex-col items-center gap-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex flex-wrap gap-4 justify-center">
        {users.map((user) => {
          return (
            <>
              {/* @ts-expect-error Server Component */}
              <UserCard key={user.id} {...user} />
            </>
          );
        })}
      </div>
    </section>
  );
}
