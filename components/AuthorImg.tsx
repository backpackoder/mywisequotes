import Image from "next/image";
import React from "react";

// Types
import { AuthorImgProps } from "@/types/props";

// Utils
import { getImgFromWiki } from "@/utils/getImgFromWiki";

export default async function AuthorImg({ author, width = 200 }: AuthorImgProps) {
  const wikipedia = await getImgFromWiki(author.name);

  return (
    <Image
      src={
        wikipedia && wikipedia.originalimage && wikipedia.originalimage.source
          ? wikipedia.originalimage.source
          : "/authorImgNotFound.jpg"
      }
      alt={author.name}
      width={width}
      height={0}
      className="w-auto h-auto max-h-60 rounded-lg duration-300"
    />
  );
}
