import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeDetail from "./RecipeDetail";
import sampleTopRecipes from "../data/SampleTopRecipes";
import buildRecipeFromMeal from "../utils/buildRecipeFromMeal";

export default function Home({ currentUser, setCurrentUser }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Click on a card to fetch full details
  const handleCardClick = async (recipe) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.id}`
      );
      const data = await res.json();

      if (data.meals && data.meals.length > 0) {
        const fullRecipe = buildRecipeFromMeal(data.meals[0]);
        setSelectedRecipe(fullRecipe);
      } else {
        console.warn("Meal not found for ID:", recipe.id);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Mission Card */}
      <div className="mission-card">
        <h1>
          Taste of Home <span style={{ color: "white" }}>🤍</span>
        </h1>
        <p>
          Our mission is to make cooking fun, simple, and accessible for everyone.
        </p>
      </div>

      {/* Top Recipes Grid */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Top 5 Recipes</h2>

      <div className="card-grid">
        {sampleTopRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}