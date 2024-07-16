"use server";

import { prisma } from "../services/database/prisma";

export async function deleteRecipe(paramsId: number) {
  await prisma.recipe.delete({ where: { id: paramsId } });
}
