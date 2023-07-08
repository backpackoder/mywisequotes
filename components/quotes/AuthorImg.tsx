"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Utils
import { getWikiData } from "@/utils/getWikiData";

// Commons
import { IMAGES } from "@/commons/commons";

// Types
import { AuthorImgProps } from "@/types/props";
import { API } from "@/types/prisma";
import { wikiSummary } from "@/types/wikiResponse";

export function AuthorImg({ author, image }: AuthorImgProps) {
  const [wikipedia, setWikipedia] = useState<API<wikiSummary>>(null);

  useEffect(() => {
    author && getWikiData(author).then((data) => setWikipedia(data));
  }, [author]);

  return (
    <Image
      src={wikipedia?.originalimage?.source ?? IMAGES.NOT_FOUND_PROFILE_IMAGE}
      alt={author ? `${author}'s profile image` : "Default profile image"}
      width={image?.width ?? 100}
      height={image?.height ?? 0}
      priority
      className="w-auto h-auto max-h-60 rounded-lg duration-300"
    />
  );
}
