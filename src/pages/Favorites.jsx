import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeDetail from "./RecipeDetail";

export default function Favorites({ currentUser, setCurrentUser }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (!currentUser?.favorites?.length) {
    return (
      <div style={{ padding: "20px" }}>
        <div className="mission-card">
          <h1>💖 Your Favorites</h1>
          <p>You haven’t saved any recipes yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div className="mission-card">
        <h1>💖 Your Favorite Recipes</h1>
        <p>All the dishes you love, saved in one place.</p>
      </div>

      <div className="card-grid">
        {currentUser.favorites.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onClick={setSelectedRecipe}
          />
        ))}
      </div>

      <RecipeDetail
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}