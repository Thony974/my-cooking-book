const DATABASE_SEPARATOR = "|";

export function parseData(data: string) {
  return data.split(DATABASE_SEPARATOR);
}

export function parseDataToTextList(data: string, textSeparator = "\n") {
  return data.replaceAll(DATABASE_SEPARATOR, textSeparator);
}

export function formatTextListToStore(data: string, textSeparator = "\n") {
  return data.replaceAll(textSeparator, DATABASE_SEPARATOR);
}
