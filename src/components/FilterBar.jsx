import React, { useMemo, useState } from "react";

/**
 * Simple curated ingredient list for autocomplete
 * (fast, no API spam, feels instant)
 */
const COMMON_INGREDIENTS = [
  "chicken", "beef", "pork", "fish", "shrimp",
  "rice", "pasta", "noodles", "cheese", "milk",
  "butter", "egg", "garlic", "onion", "tomato",
  "potato", "carrot", "pepper", "spinach",
  "mushroom", "lemon", "beans", "corn"
];

export default function FilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  ingredients,
  setIngredients,
  sort,
  setSort,
  onApply,
}) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!input) return [];
    return COMMON_INGREDIENTS.filter(
      (i) =>
        i.startsWith(input.toLowerCase()) &&
        !ingredients.includes(i)
    ).slice(0, 6);
  }, [input, ingredients]);

  const addIngredient = (value) => {
    if (!ingredients.includes(value)) {
      setIngredients([...ingredients, value]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        background: "linear-gradient(to bottom, #ffffff, #fffacd)",
        borderRadius: "16px",
        border: "2px solid #ff91a6",
        boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
      }}
    >
      {/* Top controls */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.idCategory} value={c.strCategory}>
              {c.strCategory}
            </option>
          ))}
        </select>

        {/* Ingredient input */}
        <div style={{ position: "relative" }}>
          <input
            placeholder="Add ingredient..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                addIngredient(input.trim().toLowerCase());
              }
            }}
            style={{ width: "220px" }}
          />

          {/* Autocomplete */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "105%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #ff91a6",
                borderRadius: "10px",
                zIndex: 10,
                overflow: "hidden",
              }}
            >
              {suggestions.map((s) => (
                <div
                  key={s}
                  onClick={() => addIngredient(s)}
                  style={{
                    padding: "8px 10px",
                    cursor: "pointer",
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sort */}
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by Difficulty</option>
          <option value="easy-hard">Easy → Hard</option>
          <option value="hard-easy">Hard → Easy</option>
        </select>

        {/* Apply */}
        <button onClick={onApply}>Apply Filters</button>
      </div>

      {/* Ingredient chips */}
      {ingredients.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginTop: "12px",
            flexWrap: "wrap",
          }}
        >
          {ingredients.map((ing) => (
            <span
              key={ing}
              onClick={() => removeIngredient(ing)}
              style={{
                background: "#ffc1cc",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: "14px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {ing} ✕
            </span>
          ))}
        </div>
      )}
    </div>
  );
}