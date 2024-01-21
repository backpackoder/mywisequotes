"use client";

// Components
import { PreviewWrapper } from "@/components/add/PreviewWrapper";
import { QuoteContainer } from "@/components/quotes/QuoteContainer";
import { AuthorImg } from "@/components/quotes/AuthorImg";

export type PreviewProps = {
  content: string;
  author?: string;
  username: string;
};

export function Preview({ content, author, username }: PreviewProps) {
  const authorName = author && author !== "" ? author : "Unknown author";

  return (
    <PreviewWrapper>
      <QuoteContainer>
        <p>{`- "${content}."`}</p>

        <AuthorImg author={author} image={{ width: 100 }} />

        <p>- {authorName}</p>

        <p className="text-xs italic">
          Created by <span className="font-bold">@{username}</span>
        </p>
      </QuoteContainer>
    </PreviewWrapper>
  );
}
