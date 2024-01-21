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
    if (!author || author === "") {
      setWikipedia(null);
    }

    if (author && author !== "") {
      getWikiData(author).then((data) => setWikipedia(data));
    }
  }, [author]);

  return (
    <Image
      src={wikipedia?.originalimage?.source ?? IMAGES.DEFAULT_PROFILE_IMAGE}
      alt={`${author}'s profile image`}
      width={image?.width ?? 100}
      height={image?.height ?? 0}
      priority
      className="w-auto h-auto max-h-60 rounded-lg duration-300"
    />
  );
}
