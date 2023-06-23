export default function toCapitalize(text: string) {
  const capitalizedStr = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalizedStr;
}
