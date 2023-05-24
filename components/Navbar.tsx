import React from "react";

// Components
import Searchbar from "./Searchbar";

// Types
import { NavbarProps } from "@/types/props";

export default function Navbar({ type, data }: NavbarProps) {
  return (
    <div className="flex justify-center gap-4 p-4 border-2 border-black">
      <div>{data.totalCount} results</div>

      <Searchbar type={type} />
    </div>
  );
}
