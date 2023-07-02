"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Utils
import { getImgFromWiki } from "@/utils/getImgFromWiki";

// Commons
import { IMAGES } from "@/commons/commons";

// Types
import { AuthorImgProps } from "@/types/props";
import { wikiSummary } from "@/types/wikiResponse";

export default function AuthorImg({ author, image }: AuthorImgProps) {
  const [wikipedia, setWikipedia] = useState<wikiSummary | null | undefined>(null);

  useEffect(() => {
    getImgFromWiki(author).then((data) => setWikipedia(data));
  }, [author]);

  return (
    <Image
      src={wikipedia?.originalimage?.source ?? IMAGES.NOT_FOUND_PROFILE_IMAGE}
      alt={author}
      width={image?.width ?? 100}
      height={image?.height ?? 0}
      className="w-auto h-auto max-h-60 rounded-lg duration-300"
    />
  );
}
