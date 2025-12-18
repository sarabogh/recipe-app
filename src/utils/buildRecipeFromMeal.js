const COMMON_ALLERGENS = [
  "Dairy",
  "Eggs",
  "Peanuts",
  "Tree Nuts",
  "Soy",
  "Wheat",
  "Shellfish",
  "Fish",
];

const getRandomAllergens = () => {
  const count = Math.floor(Math.random() * 3) + 1;
  return [...COMMON_ALLERGENS]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export default function buildRecipeFromMeal(meal) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
    allergens: getRandomAllergens(),
    ingredients: Array.from({ length: 20 })
      .map((_, i) => {
        const ing = meal[`strIngredient${i + 1}`];
        const meas = meal[`strMeasure${i + 1}`];
        return ing && ing.trim() ? `${ing} – ${meas || ""}` : null;
      })
      .filter(Boolean),
    instructions: meal.strInstructions,
  };
}