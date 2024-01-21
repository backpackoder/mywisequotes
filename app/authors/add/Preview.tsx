// Components
import { PreviewWrapper } from "@/components/add/PreviewWrapper";
import { AuthorWrapper } from "@/components/authors/AuthorWrapper";
import { AuthorTemplate } from "@/components/authors/AuthorTemplate";

// Types
import { State } from "./page";
import { WikiAuthorDatas } from "../[slug]/page";

type PreviewProps = {
  state: State;
};

export function Preview({ state }: PreviewProps) {
  const { wikiData } = state;

  const datas: WikiAuthorDatas = {
    name: wikiData?.title ?? "",
    description: wikiData?.description ?? "",
    bio: wikiData?.extract ?? "",
    wikipediaLink: {
      desktop: wikiData?.content_urls?.desktop.page,
      mobile: wikiData?.content_urls?.mobile.page,
    },
    imageSrc: wikiData?.originalimage?.source,
  };

  return (
    <PreviewWrapper>
      <AuthorWrapper>
        <AuthorTemplate wikiData={datas} />
      </AuthorWrapper>
    </PreviewWrapper>
  );
}
