export type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
};

export type Quotes = {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Quote[];
};

export type Author = {
  _id: string;
  bio: string;
  description: string;
  link: string;
  name: string;
  slug: string;
  quoteCount: number;
};

export type Authors = {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number | null;
  results: Author[];
};

export type URL =
  | "RANDOM_SINGLE"
  | "RANDOM_MULTIPLE"
  | "QUOTES"
  | "AUTHORS"
  | "SEARCH_QUOTES"
  | "SEARCH_AUTHORS"
  | "TAGS";

export type API_URL_TYPE = {
  [key: string]: string;
};
