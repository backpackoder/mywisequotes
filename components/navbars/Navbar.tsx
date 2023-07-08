"use client";

import { useEffect, useState } from "react";

// Components
import { Searchbar } from "../Searchbar";

// Utils
import { getFilters } from "@/utils/getFilters";

// Types
import { NavbarProps } from "@/types/props";
import { API, ManyData, PrismaTag } from "@/types/prisma";

export function Navbar({ type, totalCount, dispatch }: NavbarProps) {
  const [tags, setTags] = useState<API<ManyData<PrismaTag>>>(null);
  const filters = tags && getFilters({ type, tags: tags.data });

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>, title: string) {
    dispatch({ type: title, payload: e.target.value });
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("api/tags", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await data.json().then((data) => setTags(data));
    }

    fetchData();
  }, []);

  return tags && filters ? (
    <div className="flex flex-wrap justify-center gap-2 bg-sky-200 rounded-xl">
      <p className="flex items-center">
        {totalCount} {totalCount === 1 ? "result" : "results"}
      </p>

      {filters.map((filter, index) => {
        return (
          <div key={index} className="flex flex-col justify-between gap-2 p-2">
            <label htmlFor={filter.title} className="text-center">
              {filter.label}
            </label>
            <select
              name={filter.title}
              id={filter.title}
              onChange={(e) => handleSelectChange(e, filter.title)}
              defaultValue={filter.values.default.value}
              className="bg-transparent p-2 border-2 border-black border-opacity-50 rounded-xl"
            >
              {filter.values.others.map((value, index) => {
                return (
                  <option key={index} value={value.value}>
                    {value.label}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}

      <Searchbar type={type} />
    </div>
  ) : null;
}
