export type Params = {
  url: string;

  maxLength?: number;
  minLength?: number;
  tags?: string;
  author?: string;

  limit?: number;

  sortBy?: string;
  order?: string;
  page?: number;
  slug?: string;

  query?: string;
  fields?: string;
  fuzzyMaxEdits?: number;
  fuzzyMaxExpansions?: number;

  autocomplete?: boolean;
  matchThreshold?: number;
};
