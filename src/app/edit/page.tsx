"use client";

import { useEffect, useRef, useState } from "react";

import { Recipe } from "@prisma/client";

import { Params, SearchParams } from "../interfaces";
import { createRecipe, getRecipe, updateRecipe } from "./actions";
import { parseDataToTextList } from "../services/database/parser";

import styles from "./page.module.css";

export default function Edit({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const editForm = useRef<HTMLFormElement>(null);

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const paramsId = searchParams.id;
    if (paramsId === undefined) {
      await createRecipe(formData);
      editForm.current?.reset();
    } else {
      await updateRecipe(formData, parseInt(paramsId as string));
    }
  };

  useEffect(() => {
    const fetchRecipe = async (id: string) => {
      try {
        const paramsId = parseInt(id);
        const recipe = await getRecipe(paramsId);
        setRecipe(recipe);
      } catch (error) {
        console.error(`Error getting recipe with id ${id}: error`);
      }
    };

    if (searchParams.id) fetchRecipe(searchParams.id as string);
  }, []);

  return (
    <form ref={editForm} className={styles.form} action={handleSubmit}>
      <div className={styles.formContainer}>
        <label className={styles.formItem}>
          Title(*):
          <input
            name="title"
            required
            defaultValue={recipe ? recipe.title : ""}
          />
        </label>

        <label className={styles.formItem}>
          Hashtags:
          <input
            name="hashtags"
            defaultValue={
              recipe?.hashtags ? parseDataToTextList(recipe?.hashtags) : ""
            }
          />
        </label>

        <label className={styles.formItem}>
          Ingredients(*):
          <textarea
            name="ingredients"
            required
            defaultValue={recipe ? parseDataToTextList(recipe.ingredients) : ""}
          />
        </label>

        <label className={styles.formItem}>
          Preparation(*):
          <textarea
            name="description"
            required
            defaultValue={recipe ? parseDataToTextList(recipe.description) : ""}
          />
        </label>

        <div className={styles.formSubmit}>
          <button type="submit">Valider</button>
        </div>
      </div>
    </form>
  );
}
