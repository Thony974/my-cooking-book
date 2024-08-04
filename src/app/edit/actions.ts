"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { PartialPlainObjectRecipe, PlainObjectRecipe } from "@/models/Recipe";
import { prisma } from "@/services/database/prisma";
import { BUFFER_ENCODING } from "@/services/database/parser";

/**
 * Get plain Object Recipe from original one
 * @param id
 * @returns Plain Object Recipe - Cause Buffer cannot be passed from Server to Client components (edit page).
 */
export async function getRecipe(id: number): Promise<PlainObjectRecipe> {
  const recipe = await prisma.recipe.findUnique({ where: { id: id } });

  if (!recipe) throw new Error(` Error on getting recipe ${id}`);

  return {
    id: recipe.id,
    creationDate: recipe.creationDate,
    title: recipe.title,
    category: recipe.category,
    ingredients: recipe.ingredients.toString(BUFFER_ENCODING),
    preparation: recipe.preparation.toString(BUFFER_ENCODING),
    hashtags: recipe.hashtags,
    rate: recipe.rate,
    comments: recipe.comments ? recipe.comments.toString(BUFFER_ENCODING) : "",
  };
}

export async function createRecipe({
  title,
  category,
  hashtags,
  ingredients,
  preparation,
}: PartialPlainObjectRecipe) {
  const dateNow = new Date().toISOString();

  const recipe = await prisma.recipe.create({
    data: {
      creationDate: dateNow,
      title: title,
      category: category,
      hashtags: hashtags,
      ingredients: Buffer.from(ingredients, BUFFER_ENCODING),
      preparation: Buffer.from(preparation, BUFFER_ENCODING),
    },
  });

  revalidatePath("/");

  return recipe.id;
}

export async function updateRecipe(
  id: number,
  {
    title,
    category,
    hashtags,
    ingredients,
    preparation,
  }: PartialPlainObjectRecipe
) {
  if (isNaN(id)) throw new Error(`Unknown recipe id (NaN)`);

  await prisma.recipe.update({
    where: { id: id },
    data: {
      title: title,
      category: category,
      hashtags: hashtags,
      ingredients: Buffer.from(ingredients, BUFFER_ENCODING),
      preparation: Buffer.from(preparation, BUFFER_ENCODING),
    },
  });

  redirect(`/details?id=${id.toString()}`);
}
