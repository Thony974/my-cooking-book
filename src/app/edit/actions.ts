"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../services/database/prisma";
import { formatTextListToStore } from "../services/database/parser";

export async function getRecipe(id: number) {
  return await prisma.recipe.findUnique({ where: { id: id } });
}

export async function createRecipe(formData: FormData) {
  await prisma.recipe.create({
    data: {
      title: formData.get("title") as string,
      hashtags: formatTextListToStore(formData.get("hashtags") as string, "#"),
      ingredients: formatTextListToStore(formData.get("ingredients") as string),
      description: formatTextListToStore(formData.get("description") as string),
    },
  });
}

export async function updateRecipe(formData: FormData, paramsId: number) {
  if (isNaN(paramsId)) return;

  await prisma.recipe.update({
    where: { id: paramsId },
    data: {
      title: formData.get("title") as string,
      hashtags: formatTextListToStore(formData.get("hashtags") as string, "#"),
      ingredients: formatTextListToStore(formData.get("ingredients") as string),
      description: formatTextListToStore(formData.get("description") as string),
    },
  });

  revalidatePath(`/edit?id=${paramsId.toString()}`);
}
