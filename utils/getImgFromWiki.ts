// Types
import { wikiSummary } from "@/types/wikiResponse";

const wiki = require("wikipedia");

export async function getImgFromWiki(author: string) {
  const parts = author.split(" ");
  const capitalizedParts = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  const authorOnWikipediaFormat = capitalizedParts.join("_");

  try {
    const summaryWithoutPage: wikiSummary = await wiki.summary(authorOnWikipediaFormat);

    return summaryWithoutPage;
  } catch (error) {
    console.log(error);
  }
}
