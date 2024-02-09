import { prisma } from "@/lib/prisma";
import { AuthorWrapper } from "@/components/authors/AuthorWrapper";
import { AuthorNotFound } from "@/components/authors/AuthorNotFound";
import { slugWithSpacesHandle } from "@/utils/slugWithSpacesHandle";
import { getWikiData } from "@/utils/getWikiData";
import { WikiAuthorDatas } from "./page";

export default async function Author({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const slugWithSpaces = slugWithSpacesHandle(slug);

  const author = await prisma.author.findFirst({
    where: {
      englishName: slugWithSpaces,
    },
    include: {
      translations: true,
      quotes: true,
    },
  });

  const wikiData = author && (await getWikiData(author.englishName));

  const datas: WikiAuthorDatas = wikiData && {
    name: wikiData.title,
    description: wikiData.description,
    bio: wikiData.extract,
    wikipediaLink: {
      desktop: wikiData.content_urls.desktop.page,
      mobile: wikiData.content_urls.mobile.page,
    },
    imageSrc: wikiData.originalimage.source,
  };

  return (
    <AuthorWrapper>
      {author ? (
        <>
          {/* @ts-expect-error Async Server Component */}
          {/* <AuthorTemplate slugWithSpaces={slugWithSpaces} wikiData={datas} /> */}
          hey
        </>
      ) : (
        <AuthorNotFound authorName={slugWithSpaces} />
      )}
    </AuthorWrapper>
  );
}
