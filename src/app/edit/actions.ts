"use server";

import { prisma } from "../services/database/prisma";
import { formatTextListToStore } from "../services/database/parser";
import { redirect } from "next/navigation";

export async function getRecipe(id: number) {
  return await prisma.recipe.findUnique({ where: { id: id } });
}

export async function createRecipe(formData: FormData) {
  const recipe = await prisma.recipe.create({
    data: {
      title: formData.get("title") as string,
      hashtags: formatTextListToStore(formData.get("hashtags") as string, "#"),
      ingredients: formatTextListToStore(formData.get("ingredients") as string),
      preparation: formatTextListToStore(formData.get("preparation") as string),
    },
  });

  return recipe.id;
}

export async function updateRecipe(id: number, formData: FormData) {
  if (isNaN(id)) return;

  await prisma.recipe.update({
    where: { id: id },
    data: {
      title: formData.get("title") as string,
      hashtags: formatTextListToStore(formData.get("hashtags") as string, "#"),
      ingredients: formatTextListToStore(formData.get("ingredients") as string),
      preparation: formatTextListToStore(formData.get("preparation") as string),
    },
  });

  redirect(`/details?id=${id.toString()}`);
}
