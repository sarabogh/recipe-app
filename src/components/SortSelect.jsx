import React from "react";

export default function SortSelect({ sort, setSort }) {
  return (
    <div style={{ textAlign: "center", marginTop: "15px" }}>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "12px",
          border: "1px solid #ff91a6",
          fontFamily: "Comic Sans MS",
        }}
      >
        <option value="">Sort by Difficulty</option>
        <option value="easy-hard">Easy → Hard</option>
        <option value="hard-easy">Hard → Easy</option>
      </select>
    </div>
  );
}