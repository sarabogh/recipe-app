import React from "react";

export default function RecipeFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  ingredient,
  setIngredient,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        marginBottom: "25px",
        flexWrap: "wrap",
      }}
    >
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          padding: "10px 12px",
          borderRadius: "12px",
          border: "1px solid #ff91a6",
          fontFamily: "Comic Sans MS",
        }}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.idCategory} value={c.strCategory}>
            {c.strCategory}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Filter by ingredient..."
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        style={{ width: "220px" }}
      />
    </div>
  );
}