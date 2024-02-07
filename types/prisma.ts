// Types
import {
  Author,
  AuthorTranslation,
  Comment,
  CommentLike,
  Language,
  Quote,
  QuoteTranslation,
  Tag,
  TagTranslation,
  User,
} from "@prisma/client";

export type API<T> = T | null | undefined;

export type ManyData<T> = {
  count: number;
  data: T[];
};

export interface PrismaUser extends User {
  quotes: Quote[];
  // favorites: Favorite[];
  comments: Comment[];
  commentLikes: CommentLike[];
  // commentReplies: commentReply[];
}

export interface PrismaQuote extends Quote {
  createdBy: User;
  updatedBy: User[];
  translations: PrismaQuoteTranslation[];
  author: Author & { translations: AuthorTranslation[] & { language: Language } };
  tags: Tag[] & { translations: TagTranslation[] & { language: Language } };
  // favorites: Favorite[];
  favoritedBy: User[];
  comments: Comment[] & {
    user: User;
    likes: CommentLike[] & { user: User };
    // replies: commentReply[] & { user: User; likes: CommentLike[] }[];
  };
}

export interface PrismaQuoteTranslation extends QuoteTranslation {
  language: Language;
}

export interface PrismaTag extends Tag {
  translations: PrismaTagTranslation[];
  language: Language;
  quotes: Quote[];
}

export interface PrismaTagTranslation extends TagTranslation {
  language: Language;
}

export interface PrismaAuthor extends Author {
  translations: PrismaAuthorTranslation[];
  quotes: Quote[];
}

export interface PrismaAuthorTranslation extends AuthorTranslation {
  language: Language;
}

export interface PrismaLanguage extends Language {
  quotes: Quote[];
  tags: Tag[];
  authors: Author[];
}
