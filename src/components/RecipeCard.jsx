import React from "react";

const COMMON_ALLERGENS = [
  "Gluten",
  "Dairy",
  "Eggs",
  "Soy",
  "Peanuts",
  "Tree Nuts",
  "Shellfish",
];

function getRandomAllergens() {
  const count = Math.floor(Math.random() * 3) + 1; // 1–3
  const shuffled = [...COMMON_ALLERGENS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function RecipeCard({ recipe, onClick, currentUser, setCurrentUser }) {
  const allergens = recipe.allergens?.length ? recipe.allergens : getRandomAllergens();

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!currentUser) return;

    const updatedUser = { ...currentUser };
    if (!updatedUser.favorites) updatedUser.favorites = [];

    const exists = updatedUser.favorites.find((r) => r.id === recipe.id);
    if (exists) {
      updatedUser.favorites = updatedUser.favorites.filter((r) => r.id !== recipe.id);
    } else {
      updatedUser.favorites.push({ ...recipe, allergens });
    }

    setCurrentUser(updatedUser);
  };

  const isFavorite = currentUser?.favorites?.some((r) => r.id === recipe.id);

  return (
    <div className="card" onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.name} />

      <div className="card-body">
        <h3>{recipe.name}</h3>
        <p>Difficulty: {recipe.difficulty}</p>

        {/* Allergens */}
        <div className="allergen-tags">
          {allergens.map((a) => (
            <span key={a} className="allergen-tag">{a}</span>
          ))}
        </div>
      </div>

      <button className="favorite" onClick={handleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}