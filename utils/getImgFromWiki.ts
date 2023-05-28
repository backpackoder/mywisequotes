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

// export async function getImgFromWiki(author: string) {
//   const parts = author.split(" ");
//   const capitalizedParts = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
//   const wikipediaFormat = capitalizedParts.join("_");

//   const url = `https://wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
//     wikipediaFormat
//   )}&prop=pageimages&format=json&pithumbsize=500`;

//   try {
//     const response = await fetch(url);
//     const data: WikiResponse = await response.json();

//     const pageId = Object.keys(data.query.pages)[0];
//     const imageInfo = data.query.pages[pageId].thumbnail;
//     const imageUrl = imageInfo ? imageInfo.source : null;

//     return imageUrl;
//   } catch (error) {
//     console.error("Erreur lors de la récupération de l'image de Wikipedia :", error);
//     return null;
//   }
// }

// const url = `https://wikipedia.org/w/api.php?action=query&titles=${wikipediaFormat}&prop=pageimages&format=json&pithumbsize=500`;
