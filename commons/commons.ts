// Types
import { API_URL_TYPE } from "@/types/API";

// MAIN
export const TITLE = "My wise quotes";

// API
export const API_URL_MAIN = "https://api.quotable.io";

export const API_URL = {
  // Get one or more random quotes from the database. This method supports several filters that can be used to get random quotes with specific properties (ie tags, quote length, etc.)
  QUOTES_RANDOM: `${API_URL_MAIN}/quotes/random`,

  // Get all quotes matching a given query. By default, this will return a paginated list of all quotes, sorted by _id. Quotes can also be filter by author, tag, and length.
  QUOTES: `${API_URL_MAIN}/quotes`,

  // Get all authors matching the given query. This endpoint can be used to list authors, with several options for sorting and filter. It can also be used to get author details for one or more specific authors, using the author slug or ids.
  AUTHORS: `${API_URL_MAIN}/authors`,

  // This endpoint allows you to search for quotes by keywords, content, and/or author name. Unlike the List Quotes endpoint, this method is powered by Atlas Search and is designed to power a search bar UI.
  SEARCH_QUOTES: `${API_URL_MAIN}/search/quotes`,

  // This endpoint allows you search for authors by name. It is designed to power a search bar for authors that displays autocomplete suggests as the user types.
  SEARCH_AUTHORS: `${API_URL_MAIN}/search/authors`,

  // Get a list of all tags
  TAGS: `${API_URL_MAIN}/tags`,
};
