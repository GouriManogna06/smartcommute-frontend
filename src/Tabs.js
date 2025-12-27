import React from "react";

function Tabs({ activeTab, onTabChange, labels }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      {Object.entries(labels).map(([key, value]) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          style={{
            padding: "8px 14px",
            background: activeTab === key ? "#3498db" : "#e0e0e0",
            color: activeTab === key ? "white" : "black",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: activeTab === key ? "bold" : "normal",
          }}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
