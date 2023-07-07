"use client";

// Components
import { QuoteContainer } from "@/components/quotes/QuoteContainer";
import { AuthorImg } from "@/components/quotes/AuthorImg";

export type PreviewProps = {
  content: string;
  author: string | null;
  username: string;
};

export function Preview({ content, author, username }: PreviewProps) {
  return (
    <article className="border-4">
      <h2 className="text-2xl">Preview</h2>

      <QuoteContainer>
        <p>{`- "${content}."`}</p>

        <AuthorImg author={author} image={{ width: 100 }} />

        <p>- {author ?? "Unknown author"}</p>

        <p className="text-xs italic">
          Created by <span className="font-bold">@{username}</span>
        </p>
      </QuoteContainer>
    </article>
  );
}
