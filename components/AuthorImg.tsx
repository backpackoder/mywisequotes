"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

// Types
import { AuthorImgProps } from "@/types/props";

// Utils
import { getImgFromWiki } from "@/utils/getImgFromWiki";
import { wikiSummary } from "@/types/wikiResponse";

export default function AuthorImg({ author, width = 200 }: AuthorImgProps) {
  const [wikipedia, setWikipedia] = useState<wikiSummary | null | undefined>(null);

  useEffect(() => {
    getImgFromWiki(author).then((data) => setWikipedia(data));
  }, [author]);

  return (
    <Image
      src={
        wikipedia && wikipedia.originalimage && wikipedia.originalimage.source
          ? wikipedia.originalimage.source
          : "/authorImgNotFound.jpg"
      }
      alt={author}
      width={width}
      height={0}
      className="w-auto h-auto max-h-60 rounded-lg duration-300"
    />
  );
}
