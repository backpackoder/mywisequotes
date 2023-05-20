import React from "react";

// Components
import Searchbar from "./Searchbar";

// Types
import { NavbarProps } from "@/types/props";

export default function Navbar({ type, data }: NavbarProps) {
  return (
    <div className="flex justify-center gap-4 p-4 border-2 border-black">
      <div>count: {data.count}</div>
      <div>totalCount: {data.totalCount}</div>
      <div>page: {data.page}</div>
      <div>totalPages: {data.totalPages}</div>
      <div>lastItemIndex: {data.lastItemIndex}</div>

      <Searchbar type={type} />
    </div>
  );
}
