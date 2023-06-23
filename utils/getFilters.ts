// Types
import { Tag } from "@/components/navbars/Navbar";

export function getFilters({ type, tags }: { type: string; tags: Tag[] }) {
  const limit = {
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

  const sortBy = {
    title: "sortBy",
    label: "Sort by",
    values: {
      default:
        type === "quotes"
          ? { value: "dateAdded", label: "date added" }
          : { value: "name", label: "name" },
      others:
        type === "quotes"
          ? [
              { value: "dateAdded", label: "date added" },
              { value: "dateModified", label: "date modified" },
              { value: "author", label: "author" },
              { value: "content", label: "content" },
            ]
          : [
              { value: "dateAdded", label: "date added" },
              { value: "dateModified", label: "date modified" },
              { value: "name", label: "name" },
              { value: "quoteCount", label: "nb of quotes" },
            ],
    },
  };

  const order = {
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

  const FILTERS = [limit, sortBy, order];

  if (type === "quotes") {
    FILTERS.push({
      title: "tags",
      label: "Tags",
      values: {
        default: { value: "", label: "all" },
        others: [
          { value: "", label: "all" },
          ...tags.map((tag) => ({ value: tag.name, label: tag.name })),
        ],
      },
    });
  }

  return FILTERS;
}
