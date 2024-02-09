// Types
import { Filter, QuoteKeyOf, QuoteTranslationKeyOf } from "@/types/getFilters";
import { PrismaTag } from "@/types/prisma";

type GetFiltersProps = {
  tags: PrismaTag[];
};

export function getFilters({ tags }: GetFiltersProps) {
  const limit: Filter<number> = {
    title: "limit",
    label: "Results per page",
    values: {
      default: { value: 20, label: "20" },
      others: [
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 30, label: "30" },
        { value: 40, label: "40" },
        { value: 50, label: "50" },
      ],
    },
  };

  const sortBy: Filter<QuoteKeyOf | QuoteTranslationKeyOf> = {
    title: "sortBy",
    label: "Sort by",
    values: {
      default: { value: "createdAt", label: "date added" },
      others: [
        { value: "createdAt", label: "date added" },
        { value: "updatedAt", label: "date modified" },
        { value: "author", label: "author" },
        { value: "content", label: "content" },
      ],
    },
  };

  const order: Filter<string> = {
    title: "order",
    label: "Order by",
    values: {
      default: { value: "asc", label: "ascending" },
      others: [
        { value: "asc", label: "ascending" },
        { value: "desc", label: "descending" },
      ],
    },
  };

  const tagsFilter: Filter<string> = {
    title: "tags",
    label: "Tags",
    values: {
      default: { value: "", label: "all" },
      others: [
        { value: "", label: "all" },
        ...tags.map((tag) => ({
          value: tag.translations[0]?.name,
          label: tag.translations[0]?.name,
        })),
      ],
    },
  };

  const FILTERS = [limit, sortBy, order, tagsFilter];

  return FILTERS;
}
