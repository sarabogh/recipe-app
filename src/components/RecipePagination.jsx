import React from "react";

export default function RecipePagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: p === currentPage ? "#ffc1cc" : "#fffaf0",
            color: p === currentPage ? "#fff" : "#333",
            fontWeight: "bold"
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}