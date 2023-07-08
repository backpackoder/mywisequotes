import { prisma } from "@/lib/prisma";

// Components
import { AuthorWrapper } from "@/components/authors/AuthorWrapper";
import { AuthorTemplate } from "@/components/authors/AuthorTemplate";
import { AuthorNotFound } from "@/components/authors/AuthorNotFound";

// Types
import { PRISMA_CALLS } from "@/utils/prismaCalls";
import { getWikiData } from "@/utils/getWikiData";

export type WikiAuthorDatas =
  | {
      name: string;
      description: string;
      bio: string;
      wikipediaLink: {
        desktop?: string;
        mobile?: string;
      };
      imageSrc?: string;
    }
  | null
  | undefined;

export default async function Author({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const slugWithSpaces = slug.replace("%20", " ");

  const author = await prisma.author.findFirst({
    where: {
      translations: {
        some: {
          name: slugWithSpaces,
        },
      },
    },

    include: PRISMA_CALLS.authors.include,
  });

  const wikiData = author && (await getWikiData(author.translations[0].name));

  const datas: WikiAuthorDatas = wikiData && {
    name: author.translations[0].name,
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
        <AuthorTemplate author={author} wikiData={datas} />
      ) : (
        <AuthorNotFound authorName={slugWithSpaces} />
      )}
    </AuthorWrapper>
  );
}
