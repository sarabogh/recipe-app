export const extractIngredients = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) ingredients.push(`${ingredient} – ${measure}`);
  }
  return ingredients;
};

export const generateDifficulty = () => ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)];

export const generateAllergens = () => {
  const possible = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs"];
  const count = Math.floor(Math.random() * 3);
  return possible.sort(() => 0.5 - Math.random()).slice(0, count);
};

export const formatRecipes = (meals) => {
  if (!meals) return [];
  return meals.map((meal) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    ingredients: extractIngredients(meal),
    instructions: meal.strInstructions,
    difficulty: generateDifficulty(),
    allergens: generateAllergens(),
    description: meal.strInstructions?.substring(0, 80) + "...",
  }));
};