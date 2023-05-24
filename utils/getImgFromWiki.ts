type WikiResponse = {
  batchcomplete: string;
  query: {
    normalized: { from: string; to: string }[];
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        thumbnail: {
          source: string;
          width: number;
          height: number;
        };
        pageimage: string;
      };
    };
  };
};

export async function getImgFromWiki(author: string) {
  const parts = author.split(" ");
  const capitalizedParts = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  const wikipediaFormat = capitalizedParts.join("_");

  const url = `https://wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    wikipediaFormat
  )}&prop=pageimages&format=json&pithumbsize=500`;

  // const url = `https://wikipedia.org/w/api.php?action=query&titles=${wikipediaFormat}&prop=pageimages&format=json&pithumbsize=500`;

  try {
    const response = await fetch(url);
    const data: WikiResponse = await response.json();

    const pageId = Object.keys(data.query.pages)[0];
    const imageInfo = data.query.pages[pageId].thumbnail;
    const imageUrl = imageInfo ? imageInfo.source : null;

    return imageUrl;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'image de Wikipedia :", error);
    return null;
  }
}
