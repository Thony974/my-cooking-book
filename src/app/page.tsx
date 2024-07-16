import { prisma } from "./services/database/prisma";

import { Card } from "./ui/Card";
import { SearchBar } from "./ui/SearchBar";

import styles from "./page.module.css";
import Link from "next/link";
import { Params, SearchParams } from "./interfaces";

// TODO export in another files...
const findMany = () => {
  return prisma.recipe.findMany();
};
const findManyByTitle = (key: string) => {
  return prisma.recipe.findMany({
    where: { title: { contains: key } },
  });
};
const findManyByHashtags = (key: string) => {
  return prisma.recipe.findMany({
    where: { hashtags: { contains: key } },
  });
};
const findManyByTitleOrHashtags = (key: string) => {
  return prisma.recipe.findMany({
    where: {
      OR: [{ title: { contains: key } }, { hashtags: { contains: key } }],
    },
  });
};

export default async function Home({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const find = (key: string, filters: string | undefined) => {
    if (filters === undefined) return findMany();

    if (!filters.length) return findManyByTitleOrHashtags(key);

    if (filters.includes("title") && filters.includes("hashtags")) {
      return findManyByTitleOrHashtags(key);
    } else if (filters.includes("title")) {
      return findManyByTitle(key);
    } else {
      return findManyByHashtags(key);
    }
  };

  const recipes = await find(
    searchParams.key as string,
    searchParams.filters as string
  );

  return (
    <main className={styles.main}>
      <div className={styles.searchBar}>
        <SearchBar />
        <Link href="/edit">+ Nouvelle recette</Link>
      </div>
      <div className={styles.list}>
        {recipes.map((recipe, index) => (
          <Card key={`${recipe.title}_${index}`} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
