import { RecipeCategory } from "../../models/Recipe";
import { prisma } from "./prisma";

const findMany = () => {
  return prisma.recipe.findMany();
};

const findManyByTitle = (searchKey: string, categoryFilters: number[]) => {
  return prisma.recipe.findMany({
    where: {
      title: { contains: searchKey },
      AND: { category: { in: categoryFilters } },
    },
  });
};

const findManyByHashtags = (searchKey: string, categoryFilters: number[]) => {
  return prisma.recipe.findMany({
    where: {
      hashtags: { contains: searchKey },
      AND: { category: { in: categoryFilters } },
    },
  });
};

const findManyByTitleOrHashtags = (
  searchKey: string,
  categoryFilters: number[]
) => {
  return prisma.recipe.findMany({
    where: {
      OR: [
        { title: { contains: searchKey } },
        { hashtags: { contains: searchKey } },
      ],
      AND: { category: { in: categoryFilters } },
    },
  });
};

const findManyByCategory = (categoryFilters: number[]) => {
  return prisma.recipe.findMany({
    where: {
      category: { in: categoryFilters },
    },
  });
};

export default function findManyRequest(
  key: string,
  filters: string | undefined
) {
  if (filters === undefined) return findMany();

  // Default: include all category:
  // TODO find a more dynamic ways by iterating over
  // enum to avoid modify here when enum is changing...
  let categoryFilterValues = [
    RecipeCategory.Unknown,
    RecipeCategory.Starter,
    RecipeCategory.Dish,
    RecipeCategory.Dessert,
    RecipeCategory.Breakfast,
  ];

  if (!filters.length)
    return findManyByTitleOrHashtags(key, categoryFilterValues);

  const filtersList = filters.split(",");
  const hasTitleFilter = filtersList.includes("title");
  const hasHashtagFilter = filtersList.includes("hashtags");
  const hasCategoryFilter = filtersList.find((filter) =>
    filter.startsWith("cat_")
  );
  if (hasCategoryFilter) {
    categoryFilterValues = filtersList
      .filter((filter) => filter.startsWith("cat_"))
      .map((filter) => parseInt(filter.split("_").at(1) ?? "0"));
  }

  if (hasTitleFilter && hasHashtagFilter) {
    return findManyByTitleOrHashtags(key, categoryFilterValues);
  } else if (hasTitleFilter) {
    return findManyByTitle(key, categoryFilterValues);
  } else if (hasHashtagFilter) {
    return findManyByHashtags(key, categoryFilterValues);
  } else {
    // Category only
    return findManyByCategory(categoryFilterValues);
  }
}
