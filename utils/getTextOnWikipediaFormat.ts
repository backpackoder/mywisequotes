export function getTextOnWikipediaFormat(text: string) {
  const parts = text.split(" ");
  const capitalizedParts = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  const textOnWikipediaFormat = capitalizedParts.join("_");

  return textOnWikipediaFormat;
}
