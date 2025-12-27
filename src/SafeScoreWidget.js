import React, { useEffect, useState } from "react";
import "./safetyScore.css";

function SafeScoreWidget({ score, hazardCount, aiCount }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.abs(score - current) / 25;

    const interval = setInterval(() => {
      current += step;
      if (current >= score) {
        current = score;
        clearInterval(interval);
      }
      setAnimatedScore(Math.round(current));
    }, 40);

    return () => clearInterval(interval);
  }, [score]);

  const getColor = () => {
    if (score >= 80) return "#27AE60"; // green
    if (score >= 50) return "#F2C037"; // yellow
    return "#E53935"; // red
  };

  return (
    <div className="safety-widget-container">
      <div className="gauge">
        <div className="gauge-fill" style={{ transform: `rotate(${animatedScore * 1.8}deg)`, background: getColor() }}>
        </div>
        <div className="gauge-cover">{animatedScore}</div>
      </div>

      <div className="score-details">
        <p><b>Hazards:</b> {hazardCount}</p>
        <p><b>AI Risks:</b> {aiCount}</p>
        <p><b>Safety Score:</b> {animatedScore}</p>
      </div>
    </div>
  );
}

export default SafeScoreWidget;
