"use client";

import { usePathname } from "next/navigation";

// Components
import { BreadCrumb, SVG_Home } from "@/components/navbars/BreadCrumb";

// Commons
import { ROUTES } from "@/commons/commons";

type BreadCrumbUserProps = {
  user: any;
  id: string;
};

export default function BreadCrumbUser({ user, id }: BreadCrumbUserProps) {
  const pathname = usePathname();
  const isCurrentRoute = pathname === ROUTES.USER(user?.name ?? id);

  const breadcrumbItems = [
    {
      name: "Home",
      href: ROUTES.DASHBOARD,
      svg: <SVG_Home />,
      current: isCurrentRoute,
    },
    {
      name: "Users",
      href: ROUTES.USERS,
      current: isCurrentRoute,
    },
    {
      name: user?.name ?? "User",
      href: ROUTES.USER(user?.name ?? id),
      current: isCurrentRoute,
    },
  ];

  return <BreadCrumb items={breadcrumbItems} />;
}
