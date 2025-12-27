import React from "react";
import "./NavigationPanel.css";

const NavigationPanel = ({ routeData, close }) => {
  return (
    <div className="nav-panel">
      <h2>Navigation</h2>

      {routeData?.points?.map((p, i) => (
        <p key={i}>➡️ Move to: {p.lat.toFixed(4)}, {p.lon.toFixed(4)}</p>
      ))}

      <button className="close-nav" onClick={close}>
        Stop Navigation
      </button>
    </div>
  );
};

export default NavigationPanel;
