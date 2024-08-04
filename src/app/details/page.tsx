import Image from "next/image";

import Edition from "@/components/Edition";
import Comments from "@/components/Comments";
import { Params, SearchParams } from "@/models/SearchParamsInterface";
import { getRecipe } from "@/app/edit/actions";
import { parseData } from "@/services/database/parser";

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
        <span>{recipe.hashtags ?? ""}</span>
      </div>
      <div className={styles.detailsEdit}>
        <Edition id={recipe.id} />
      </div>
      <div className={styles.detailsImg}>
        <Image
          src="/recipeImg.jpeg"
          alt="recipeImg"
          width={0}
          height={0}
          sizes="20vmax"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <h3>Ingredients</h3>
      <ul>
        {parseData(recipe.ingredients).map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Preparation</h3>
      {parseData(recipe.preparation).map((preparationStep, index) => (
        <p key={index}>{preparationStep}</p>
      ))}
      <div className={styles.detailsComment}>
        <Comments
          id={recipe.id}
          comments={recipe.comments}
          rate={recipe.rate}
        />
      </div>
    </div>
  ) : (
    <p>Recipe not found</p>
  );
}
