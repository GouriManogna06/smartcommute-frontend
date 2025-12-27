import React, { useState } from "react";
import translations from "./translations";

function RouteBox({ activeTab, onRouteRequest, userLocation }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [useGPS, setUseGPS] = useState(false);

  // dynamic labels
  const lang = localStorage.getItem("smartCommuteSettings")
    ? JSON.parse(localStorage.getItem("smartCommuteSettings")).language
    : "en";

  const text = translations[lang];

  const handleSubmit = (safe = false) => {
    if (!useGPS && source.trim() === "") return alert("Enter source");
    if (destination.trim() === "") return alert("Enter destination");

    onRouteRequest({
      source,
      destination,
      category: activeTab,
      useGPS,
      safe,
    });
  };

  return (
    <div
      style={{
        padding: "15px",
        background: "#f7f7f7",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      {/* Source */}
      <label>{text.source}</label>
      <input
        type="text"
        disabled={useGPS}
        placeholder={text.source}
        value={source}
        onChange={(e) => setSource(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* GPS checkbox */}
      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          checked={useGPS}
          onChange={() => setUseGPS(!useGPS)}
        />
        {text.useGPS}
      </label>

      {/* Destination */}
      <label style={{ marginTop: "10px" }}>{text.destination}</label>
      <input
        type="text"
        placeholder={text.destination}
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "5px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* Buttons */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => handleSubmit(false)}
          style={{
            padding: "10px",
            background: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "6px",
            width: "50%",
            cursor: "pointer",
          }}
        >
          {text.getRoute}
        </button>

        <button
          onClick={() => handleSubmit(true)}
          style={{
            padding: "10px",
            background: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "6px",
            width: "50%",
            cursor: "pointer",
          }}
        >
          {text.safeRoute}
        </button>
      </div>
    </div>
  );
}

export default RouteBox;
