// Components
import { PreviewWrapper } from "@/components/add/PreviewWrapper";
import { AuthorWrapper } from "@/components/authors/AuthorWrapper";
import { AuthorTemplate } from "@/components/authors/AuthorTemplate";

// Types
import { State } from "./types";
import { WikiAuthorDatas } from "../[slug]/page";
import { AuthorImg } from "@/components/quotes/AuthorImg";

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

  const actualLanguage = state.names.findIndex((name) => name.code === state.language);

  const isStatusValid = state.status === "valid";

  return (
    <PreviewWrapper>
      <AuthorWrapper>
        <h2 className="text-5xl">{wikiData?.title}</h2>

        <AuthorImg author={wikiData?.title} />

        <h3 className="text-lg">
          {isStatusValid
            ? state?.descriptions[actualLanguage]?.description
            : state.wikiData?.description}{" "}
        </h3>

        <p>
          {isStatusValid ? state.bio[actualLanguage].bio : state.wikiData?.extract}{" "}
          <a
            href={wikiData?.content_urls.desktop.page}
            target="_blank"
            className="text-blue-500 hover:text-blue-800"
          >
            <small>Read more on Wikipedia</small>
          </a>
        </p>
      </AuthorWrapper>
    </PreviewWrapper>
  );
}
