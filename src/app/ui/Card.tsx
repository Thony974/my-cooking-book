"use client";

import { useRouter } from "next/navigation";

import { Rating } from "primereact/rating";

import { Recipe } from "@prisma/client";

import styles from "./card.module.css";
import { parseData } from "../services/database/parser";

export interface CardProps {
  recipe: Recipe;
}

export function Card({ recipe }: CardProps) {
  const router = useRouter();

  return (
    <div
      className={styles.cardContainer}
      onClick={() => router.push(`/details?id=${recipe.id}`)}
    >
      <div className={styles.recipeContainer}>
        <ul>
          {parseData(recipe.ingredients).map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <h5>{recipe.title}</h5>
      <div className={styles.rating}>
        <Rating value={recipe.rate} cancel={false} />
      </div>
    </div>
  );
}
