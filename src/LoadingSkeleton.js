import React from "react";

function LoadingSkeleton({ text = "Loading..." }) {
  return (
    <div
      style={{
        padding: "15px",
        background: "#eee",
        borderRadius: "8px",
        marginBottom: "15px",
        animation: "pulse 1.5s infinite",
      }}
    >
      <div
        style={{
          height: "14px",
          background: "#ddd",
          borderRadius: "6px",
          marginBottom: "8px",
        }}
      ></div>
      <div
        style={{
          height: "14px",
          background: "#ddd",
          borderRadius: "6px",
          width: "70%",
        }}
      ></div>

      <p style={{ marginTop: "10px", color: "#777" }}>{text}</p>
    </div>
  );
}

export default LoadingSkeleton;

