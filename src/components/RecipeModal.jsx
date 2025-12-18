import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={recipe.image} alt={recipe.name} />
        <h2>{recipe.name}</h2>
        {recipe.allergens?.length > 0 && (
          <p style={{ color: "#e5533d" }}>{recipe.allergens.join(", ")}</p>
        )}
        <h3>Ingredients</h3>
        <ul>{recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        <button onClick={onClose} style={{ marginTop: "20px", background: "#ff91a6" }}>Close</button>
      </div>
    </div>
  );
}