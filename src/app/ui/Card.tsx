"use client";

import { useRouter } from "next/navigation";

import { Rating } from "primereact/rating";

import styles from "./card.module.css";

export interface CardProps {
  recipeId: number;
  title: string;
  ingredients: string[];
  rate: number;
}

export function Card({ recipeId, title, ingredients, rate }: CardProps) {
  const router = useRouter();

  return (
    <div
      className={styles.cardContainer}
      onClick={() => router.push(`/details?id=${recipeId.toString()}`)}
    >
      <div className={styles.recipeContainer}>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <h5>{title}</h5>
      <div className={styles.rating}>
        <Rating value={rate} cancel={false} />
      </div>
    </div>
  );
}
