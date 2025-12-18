import React, { useState } from "react";

export default function IngredientChips({ ingredients, setIngredients }) {
  const [input, setInput] = useState("");

  const addIngredient = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!ingredients.includes(input.trim().toLowerCase())) {
        setIngredients([...ingredients, input.trim().toLowerCase()]);
      }
      setInput("");
    }
  };

  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        placeholder="Add ingredient and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addIngredient}
        style={{ width: "260px", marginBottom: "10px" }}
      />

      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {ingredients.map((ing) => (
          <span
            key={ing}
            style={{
              background: "#ffc1cc",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onClick={() => removeIngredient(ing)}
          >
            {ing} ✕
          </span>
        ))}
      </div>
    </div>
  );
}