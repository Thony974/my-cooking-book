import { Card } from "./ui/Card";
import { SearchBar } from "./ui/SearchBar";

import styles from "./page.module.css";
import { Params, SearchParams } from "./models/SearchParamsInterface";
import { BUFFER_ENCODING, parseData } from "./services/database/parser";
import findMany from "./services/database/findManyRequest";

export default async function Home({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const recipes = await findMany(
    searchParams.key as string,
    searchParams.filters as string
  );

  return (
    <main className={styles.main}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.list}>
        {recipes.map((recipe, index) => (
          <Card
            key={`${recipe.title}_${index}`}
            recipeId={recipe.id}
            title={recipe.title}
            ingredients={parseData(
              recipe.ingredients.toString(BUFFER_ENCODING)
            )}
            rate={recipe.rate}
          />
        ))}
      </div>
    </main>
  );
}
