"use client";

import React, { useEffect, useMemo, useState } from "react";

// Components
import Searchbar from "./Searchbar";

// Utils
import { getData } from "@/utils/getData";
import { getFilters } from "@/utils/getFilters";

// Commons
import { API_URL } from "@/commons/commons";

// Types
import { NavbarProps } from "@/types/props";

export type Tag = {
  dateAdded: string;
  dateModified: string;
  name: string;
  quoteCount: number;
  slug: string;
  _id: string;
};

export default function Navbar({ type, totalCount, dispatch }: NavbarProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const filters = getFilters({ type, tags });

  const tagsUrl = useMemo(() => {
    return {
      url: API_URL.TAGS,
    };
  }, []);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>, title: string) {
    dispatch({ type: title, payload: e.target.value });
  }

  useEffect(() => {
    getData(tagsUrl).then((data) => setTags(data));
  }, [tagsUrl]);

  return tags ? (
    <div className="flex flex-wrap justify-center gap-2 bg-sky-200 rounded-xl">
      <p className="flex items-center">{totalCount} results</p>

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
