import React from "react";

function OfflineBanner() {
  return (
    <div
      style={{
        width: "100%",
        padding: "10px",
        background: "#f4d03f",
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      ⚠ You are offline — using cached route.
    </div>
  );
}

export default OfflineBanner;
