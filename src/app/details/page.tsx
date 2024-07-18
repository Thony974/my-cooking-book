import { parseData } from "../services/database/parser";

import { Params, SearchParams } from "../interfaces";
import Edition from "../ui/Edition";
import { getRecipe } from "../edit/actions";

import styles from "./page.module.css";

export default async function Details({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const recipe = await getRecipe(parseInt(searchParams.id as string));

  return recipe ? (
    <div className={styles.detailsContainer}>
      <h1 className={styles.detailsTitle}>{recipe.title}</h1>

      <div className={styles.detailsHashtags}>
        {recipe.hashtags
          ? parseData(recipe.hashtags).map((hashtag) => (
              <span key={hashtag}>{`#${hashtag}`}</span>
            ))
          : ""}
      </div>
      <div className={styles.detailsEdit}>
        <Edition id={recipe.id} />
      </div>
      <div className={styles.detailsImg}>
        {/**TODO<Image src="/recipeImg.png" alt="recipeImg" layout="reponsive" objectFit='contain'/>*/}
      </div>
      <h3>Ingredients</h3>
      <ul>
        {parseData(recipe.ingredients).map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Preparation</h3>
      {parseData(recipe.description).map((descriptionStep, index) => (
        <p key={index}>{descriptionStep}</p>
      ))}
    </div>
  ) : (
    <p>Recipe not found</p>
  );
}
