"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { formatCommentsToStore } from "@/services/database/parser";
import { prisma } from "@/services/database/prisma";

export async function deleteRecipe(paramsId: number) {
  await prisma.recipe.delete({ where: { id: paramsId } });
  redirect(`/`);
}

export async function updateRecipeMetaData(
  id: number,
  { rate, comments }: { rate: number; comments: string }
) {
  await prisma.recipe.update({
    where: { id: id },
    data: {
      rate: rate,
      comments: formatCommentsToStore(comments),
    },
  });

  revalidatePath(`/details?id=${id.toString()}`);
}
