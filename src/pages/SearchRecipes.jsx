import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeDetail from "./RecipeDetail";

const categories = ["Beef", "Chicken", "Dessert", "Pasta", "Seafood", "Vegan", "Vegetarian"];
const difficulties = ["Easy", "Medium", "Hard"];
const COMMON_ALLERGENS = ["Gluten", "Dairy", "Eggs", "Soy", "Nuts", "Shellfish"];

const getRandomAllergens = () => {
  const shuffled = [...COMMON_ALLERGENS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
};

export default function SearchRecipes({ currentUser, setCurrentUser }) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  // Fetch recipes from API
  const searchRecipes = async (q) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`
    );
    const data = await res.json();

    if (!data.meals) {
      setRecipes([]);
      setFilteredRecipes([]);
      return;
    }

    const formatted = data.meals.map((meal) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      instructions: meal.strInstructions,
      category: meal.strCategory,
      ingredients: Object.keys(meal)
        .filter((k) => k.startsWith("strIngredient") && meal[k])
        .map((k, i) => `${meal[k]} – ${meal[`strMeasure${i + 1}`] || ""}`),
      difficulty: difficulties[Math.floor(Math.random() * 3)],
      allergens: getRandomAllergens(),
    }));

    setRecipes(formatted);
    setFilteredRecipes(formatted); // initialize filtered list
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipes(query);
  };

  // Add ingredient to filter
  const addIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  // Apply filters manually
  const handleApplyFilters = () => {
    let result = [...recipes];

    if (category) {
      result = result.filter((r) => r.category === category);
    }

    if (difficulty) {
      result = result.filter((r) => r.difficulty === difficulty);
    }

    if (ingredients.length) {
      result = result.filter((r) =>
        ingredients.every((ing) =>
          r.ingredients.join(" ").toLowerCase().includes(ing.toLowerCase())
        )
      );
    }

    setFilteredRecipes(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          style={{ width: "60%", marginRight: "10px" }}
        />
        <button type="submit">Search</button>
      </form>

      {/* Filters */}
      <div className="filter-card">
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label>Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">All</option>
          {difficulties.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <label>Ingredients:</label>
        <input
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          placeholder="Add ingredient"
        />
        <button type="button" onClick={addIngredient}>Add</button>

        <button type="button" onClick={handleApplyFilters}>Apply Filters</button>
      </div>

      {/* Ingredient Tags */}
      <div style={{ marginBottom: "20px" }}>
        {ingredients.map((ing) => (
          <span
            key={ing}
            className="ingredient-tag"
            onClick={() => removeIngredient(ing)}
          >
            {ing} ×
          </span>
        ))}
      </div>

      {/* Recipe Cards */}
      <div className="card-grid">
        {(filteredRecipes.length ? filteredRecipes : recipes).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onClick={setSelectedRecipe}
          />
        ))}
      </div>

      {/* Recipe Detail Modal */}
      <RecipeDetail
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}