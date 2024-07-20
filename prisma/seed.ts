import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialRecipes = [
  {
    title: "Pancakes moelleuses 2",
    ingredients:
      "2 oeufs|150 ml de lait demi écrémé|1 sachet de sucre vanillé ou une cuil. à café d'extrait de vanille|125 g de farine|1 c. à café de levure chimique ou de bicarbonate|2 c. à soupe de sucre|1 pincée de sel|beurre ou huile pour la cuisson",
    preparation:
      "Dans un grand bol, mélangez les ingrédients secs : farine, levure, le sucre, 1 pincée de sel et un sachet de sucre vanillé|Dans un autre bol, mélangez les 2 jaunes d'oeuf avec le lait puis ajoutez aux ingrédients secs en mélangeant, vous obtenez une texture de pâte à crêpes bien épaisse, laissez reposer 15 à 30 minutes|Battez les blancs en neige et ajoutez-les délicatement à la préparation (c'est le secret de pancakes ultra moelleux)|Faites cuire dans une petite poêle beurrée bien chaude 1 minute de chaque côté|Le bord doit être doré, et des petites bulles doivent se former sur le dessus, c'est le moment de retourner le pancake !",
    hashtags: "PetitDejeuner|Anthony",
    rate: 2,
    comments: "This is my comment for Pancake 2 :)",
  },
];

const seed = async () => {
  for (const recipe of initialRecipes) {
    await prisma.recipe.create({ data: recipe });
  }
};

seed();
