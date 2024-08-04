"use client";

import { Suspense, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Toast } from "primereact/toast";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

import { createRecipe, getRecipe, updateRecipe } from "./actions";
import {
  RecipeCategory,
  RecipeCategories,
  PartialPlainObjectRecipe,
  PlainObjectRecipe,
} from "@/models/Recipe";
import {
  formatTextListToStore,
  parseDataToTextList,
} from "@/services/database/parser";

import styles from "./page.module.css";

function EditionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const toastRef = useRef<Toast>(null);

  const [recipe, setRecipe] = useState<PlainObjectRecipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(
    RecipeCategory.Unknown
  );

  const searchParams = useSearchParams();
  const paramsId = searchParams.get("id");

  const handleSubmit = async (formData: FormData) => {
    const titleForm = formData.get("title");
    const hashtagsForm = formData.get("hashtags");
    const ingredientsForm = formData.get("ingredients");
    const preparationForm = formData.get("preparation");

    if (!titleForm || !ingredientsForm || !preparationForm) {
      showCreateOrUpdateError("Required form data missing");
      return;
    }

    // Only fill hashtags if not empty
    const hashtags =
      hashtagsForm && hashtagsForm.toString()?.length
        ? hashtagsForm.toString()
        : null;

    const partialRecipe: PartialPlainObjectRecipe = {
      title: titleForm.toString(),
      category: selectedCategory,
      hashtags: hashtags,
      ingredients: formatTextListToStore(ingredientsForm.toString()),
      preparation: formatTextListToStore(preparationForm.toString()),
    };

    if (paramsId === null) {
      try {
        const newRecipeId = await createRecipe(partialRecipe);
        showCreateSuccess(newRecipeId);
        formRef.current?.reset();
      } catch (error: any) {
        showCreateOrUpdateError(`Echec lors de la création ${error.message}`);
        // TODO: Logger to display entire error...
      }
    } else {
      const id = parseInt(paramsId as string);
      try {
        await updateRecipe(id, partialRecipe);
      } catch (error: any) {
        showCreateOrUpdateError(`Echec de la mise à jour ${error.message}`);
        // TODO: Logger to display entire error...
      }
    }
  };

  const showCreateSuccess = (recipeId: number) => {
    toastRef.current?.show({
      severity: "success",
      summary: "Recette ajoutée",
      detail: <Link href={`/details?id=${recipeId.toString()}`}>Voir</Link>,
      life: 3000,
    });
  };

  const showCreateOrUpdateError = (error: string) => {
    toastRef.current?.show({
      severity: "error",
      summary: "Erreur",
      detail: error,
      life: 3000,
    });
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

  useEffect(() => {
    if (recipe) setSelectedCategory(recipe.category);
  }, [recipe]);

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
          Catégorie:
          <div className={styles.category}>
            {RecipeCategories.map((category) => {
              const categoryId = `category_${category.value.toString()}`;
              return (
                <div key={categoryId}>
                  <RadioButton
                    inputId={categoryId}
                    value={category.value}
                    checked={category.value === selectedCategory}
                    onChange={(event: RadioButtonChangeEvent) =>
                      setSelectedCategory(event.value)
                    }
                  />
                  <label htmlFor={categoryId}>{category.name}</label>
                </div>
              );
            })}
          </div>
        </label>

        <label className={styles.formItem}>
          Hashtags:
          <input name="hashtags" defaultValue={recipe?.hashtags ?? ""} />
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
