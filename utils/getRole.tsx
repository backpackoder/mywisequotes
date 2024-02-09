import Image from "next/image";

// Assets
import moderator from "@/app/assets/images/roles/moderator.png";
import admin from "@/app/assets/images/roles/admin.png";

// Types
import { Role } from "@prisma/client";

export function getRole(role: Role) {
  switch (role) {
    case "ADMIN":
      return (
        <>
          <Image src={admin} alt="Admin's badge" width={50} height={50} /> Admin
        </>
      );

    case "MODERATOR":
      return (
        <>
          <Image src={moderator} alt="Moderator's badge" width={50} height={50} /> Moderator
        </>
      );

    default:
      return null;
  }
}
