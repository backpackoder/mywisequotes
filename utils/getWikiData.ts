// Utils
import { getTextOnWikipediaFormat } from "./getTextOnWikipediaFormat";

// Types
import { wikiSummary } from "@/types/wikiResponse";

const wiki = require("wikipedia");

export async function getWikiData(author: string) {
  const authorOnWikipediaFormat = getTextOnWikipediaFormat(author);

  try {
    const summaryWithoutPage: wikiSummary = await wiki.summary(authorOnWikipediaFormat);

    return summaryWithoutPage;
  } catch (error) {
    console.log(error);
  }
}
