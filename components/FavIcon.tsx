"use client";

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

export function FavIcon() {
  const [isFav, setIsFav] = useState(false);

  function addedToFavs(e: React.MouseEvent<SVGElement, MouseEvent>) {
    e.stopPropagation();
    setIsFav(!isFav);
  }

  return (
    <FaHeart
      size="1.5rem"
      color={isFav ? "red" : "lightgrey"}
      className="absolute top-3 right-3 hover:scale-125"
      onClick={(e) => addedToFavs(e)}
    />
  );
}
