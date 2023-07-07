import Image from "next/image";

// Assets
import moderator from "@/app/assets/images/roles/moderator.png";
import admin from "@/app/assets/images/roles/admin.png";
import owner from "@/app/assets/images/roles/owner.png";

// Types
import { Role } from "@prisma/client";

export function getRole(role: Role) {
  switch (role) {
    case "OWNER":
      return (
        <>
          <Image src={owner} alt="Owner's badge" width={50} height={50} /> Owner
        </>
      );

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
