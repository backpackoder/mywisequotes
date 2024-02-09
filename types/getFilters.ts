import {
  PrismaAuthor,
  PrismaAuthorTranslation,
  PrismaQuote,
  PrismaQuoteTranslation,
  PrismaTag,
  PrismaTagTranslation,
} from "./prisma";

export type AuthorKeyOf = keyof PrismaAuthor;
export type AuthorTranslationKeyOf = keyof PrismaAuthorTranslation;
export type QuoteKeyOf = keyof PrismaQuote;
export type QuoteTranslationKeyOf = keyof PrismaQuoteTranslation;
export type TagKeyOf = keyof PrismaTag;
export type TagTranslationKeyOf = keyof PrismaTagTranslation;

export type Filter<T> = {
  title: string;
  label: string;
  values: {
    default: { value: T; label: string };
    others: { value: T; label: string }[];
  };
};
