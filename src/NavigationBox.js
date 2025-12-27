import React from "react";
import translations from "./translations";

function NavigationBox({
  navigationActive,
  currentStep,
  onStartNavigation,
  onStop,
  destination,
  activeHazard,
  onUseSafeRoute,
}) {
  const lang = localStorage.getItem("smartCommuteSettings")
    ? JSON.parse(localStorage.getItem("smartCommuteSettings")).language
    : "en";

  const text = translations[lang];

  return (
    <div
      style={{
        padding: "15px",
        background: "#f2f2f2",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{text.navigation}</h3>

      {/* Hazard Alert */}
      {activeHazard && (
        <div
          style={{
            padding: "10px",
            background: activeHazard.color,
            color: "white",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          ⚠ {text.hazardAhead}: {activeHazard.label} ({activeHazard.distance}m)
        </div>
      )}

      {/* Navigation buttons */}
      {!navigationActive && (
        <button
          onClick={onStartNavigation}
          style={{
            padding: "10px",
            background: "#3498db",
            color: "white",
            border: "none",
            width: "100%",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {text.startNavigation}
        </button>
      )}

      {navigationActive && (
        <>
          <button
            onClick={onStop}
            style={{
              padding: "10px",
              background: "#e74c3c",
              color: "white",
              border: "none",
              width: "100%",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            {text.stopNavigation}
          </button>

          <div
            style={{
              background: "white",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          >
            {currentStep ? (
              <>
                <p>
                  <b>{text.nextStep}: </b>
                  {currentStep.instruction}
                </p>
              </>
            ) : (
              <p>{text.noStep}</p>
            )}
          </div>

          <button
            onClick={onUseSafeRoute}
            style={{
              padding: "10px",
              background: "#2ecc71",
              color: "white",
              border: "none",
              width: "100%",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {text.safeRoute}
          </button>
        </>
      )}
    </div>
  );
}

export default NavigationBox;
