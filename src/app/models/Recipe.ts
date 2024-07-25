// TODO: Any TypeScript utility to build this type from Recipe ?
export type PlainObjectRecipe = {
  id: number;
  creationDate: string;
  title: string;
  category: number;
  ingredients: string;
  preparation: string;
  hashtags: string | null;
  rate: number;
  comments: string;
};

export type PartialPlainObjectRecipe = Omit<
  PlainObjectRecipe,
  "id" | "creationDate" | "rate" | "comments"
>;

export enum RecipeCategory {
  Unknown = -1,
  Starter,
  Dish,
  Dessert,
  Breakfast,
}

export const RecipeCategories = [
  { name: "Entrée", value: RecipeCategory.Starter },
  { name: "Plat", value: RecipeCategory.Dish },
  { name: "Dessert", value: RecipeCategory.Dessert },
  { name: "Petit Dej'", value: RecipeCategory.Breakfast },
];
