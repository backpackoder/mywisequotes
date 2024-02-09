type IndexFinderProps = {
  data: any[];
  values: string[];
  search: string;
};

export function languageIndexFinder({ data, values, search }: IndexFinderProps) {
  return data.findIndex((item) => {
    let value = item;

    for (let i = 0; i < values.length; i++) {
      const data = values[i];
      value = value[data];
    }

    return value === search;
  });
}
