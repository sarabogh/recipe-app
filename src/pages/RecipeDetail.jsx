import React from "react";

export default function RecipeDetail({ recipe, onClose }) {
  if (!recipe) return null;

  const allergens = recipe.allergens || [];

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={recipe.image} alt={recipe.name} />
        <h3>Difficulty: {recipe.difficulty}</h3>

        <div className="allergen-tags">
          {allergens.map((a) => (
            <span key={a} className="allergen-tag">{a}</span>
          ))}
        </div>

        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients?.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}