import Image from "next/image";
import React from "react";

// Types
import { AuthorImgProps } from "@/types/props";

// Utils
import { getImgFromWiki } from "@/utils/getImgFromWiki";

export default async function AuthorImg({ author, width = 200 }: AuthorImgProps) {
  const imageUrl = await getImgFromWiki(author.name);

  return (
    <Image
      src={imageUrl ?? "/authorImgNotFound.jpg"}
      alt={author.name}
      width={width}
      height={0}
      className="w-auto h-auto rounded-lg duration-300"
    />
  );
}
