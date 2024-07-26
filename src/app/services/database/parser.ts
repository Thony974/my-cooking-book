const DATABASE_SEPARATOR = "|";

export const BUFFER_ENCODING = "utf-8";

export function parseData(data: string) {
  return data.split(DATABASE_SEPARATOR);
}

export function parseDataToTextList(data: string, textSeparator = "\n") {
  return data.replaceAll(DATABASE_SEPARATOR, textSeparator);
}

export function formatTextListToStore(data: string, textSeparator = "\n") {
  return data.replaceAll(textSeparator, DATABASE_SEPARATOR);
}

export function formatCommentsToStore(comments: string) {
  return comments.length > 0 ? Buffer.from(comments, BUFFER_ENCODING) : null;
}
