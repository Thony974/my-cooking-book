"use client";

import { Suspense, useEffect, useRef, useState } from "react";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { Toast } from "primereact/toast";

import { Recipe } from "@prisma/client";

import { createRecipe, getRecipe, updateRecipe } from "./actions";
import { parseDataToTextList } from "../services/database/parser";

import styles from "./page.module.css";

function EditionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const toastRef = useRef<Toast>(null);

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const searchParams = useSearchParams();
  const paramsId = searchParams.get("id");

  const handleSubmit = async (formData: FormData) => {
    if (paramsId === null) {
      const newRecipeId = await createRecipe(formData);
      formRef.current?.reset();
      toastRef.current?.show({
        severity: "success",
        summary: "Recette ajoutée",
        detail: (
          <Link href={`/details?id=${newRecipeId.toString()}`}>Voir</Link>
        ),
        life: 3000,
      });
    } else {
      await updateRecipe(parseInt(paramsId as string), formData);
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

    if (paramsId !== null) fetchRecipe(paramsId);
  }, [searchParams]);

  return (
    <form ref={formRef} className={styles.form} action={handleSubmit}>
      <div className={styles.formContainer}>
        <label className={styles.formItem}>
          Titre(*):
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
            name="preparation"
            required
            defaultValue={recipe ? parseDataToTextList(recipe.preparation) : ""}
          />
        </label>

        <div className={styles.formSubmit}>
          <button type="submit">Valider</button>
        </div>
        <Toast ref={toastRef} />
      </div>
    </form>
  );
}

export default function Edit() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditionForm />
    </Suspense>
  );
}
