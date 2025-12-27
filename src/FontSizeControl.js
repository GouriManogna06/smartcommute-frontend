import React from "react";

function FontSizeControl({ size, setSize }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "10px", fontWeight: "bold" }}>
        Font Size:
      </label>

      <input
        type="range"
        min="12"
        max="32"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <span style={{ marginLeft: "10px" }}>{size}px</span>
    </div>
  );
}

export default FontSizeControl;
