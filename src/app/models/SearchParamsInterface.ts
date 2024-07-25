export interface Params {
  slug: string;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}
