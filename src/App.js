import React, { useState, useEffect } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import "./i18n";
import HyderabadMap from "./HyderabadMap";
import ProfileScreen from "./ProfileScreen";
import BookingScreen from "./BookingScreen";
import NavigationPanel from "./NavigationPanel";
import {
  FaMotorcycle,
  FaWheelchair,
  FaUsers,
  FaDog,
  FaBaby,
} from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const { t, i18n } = useTranslation();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routeData, setRouteData] = useState(null);
  const [showNav, setShowNav] = useState(false);

  const [hazards, setHazards] = useState(0);
  const [aiRisk, setAiRisk] = useState(0);
  const [safetyScore, setSafetyScore] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const navigate = useNavigate();

  const categories = [
    { key: "general", icon: <FaMotorcycle />, label: t("general") },
    { key: "special", icon: <FaWheelchair />, label: t("special") },
    { key: "helper", icon: <FaUsers />, label: t("helper") },
    { key: "pet", icon: <FaDog />, label: t("pet") },
    { key: "child", icon: <FaBaby />, label: t("child") },
    { key: "infant", icon: <GiJourney />, label: t("infant") },
  ];

  const goBooking = (cat) => {
    navigate(`/booking?category=${cat}`);
  };

  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  const getRoute = async () => {
    if (!source || !destination) {
      alert("Enter source and destination");
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/routing/route?source=${source}&destination=${destination}`
      );

      if (!res.ok) {
        alert("Backend Error");
        return;
      }

      const data = await res.json();
      setRouteData(data);

      setHazards(data.hazards || 1);
      setAiRisk(1);
      setSafetyScore(data.safety_score || 80);
    } catch (err) {
      alert("Cannot reach backend");
    }
  };

  const getSaferRoute = () => {
    if (!routeData) {
      alert("Get route first");
      return;
    }
    setAiRisk(0);
    setHazards(0);
    setSafetyScore(95);
  };

  return (
    <Routes>
      {/* ================= HOME SCREEN ================= */}
      <Route
        path="/"
        element={
          <div className="app-container" style={{ fontSize: `${fontSize}px` }}>
            {profileOpen && <ProfileScreen close={() => setProfileOpen(false)} />}

            <header className="header">
              <h1>{t("title")}</h1>
              <button className="profile-btn" onClick={() => setProfileOpen(true)}>
                👤
              </button>
            </header>

            {!isOnline && <div className="offline-banner">{t("offline")}</div>}

            <div className="controls">
              <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
                <option value="hi">Hindi</option>
              </select>

              <div className="font-control">
                <label>Font</label>
                <input
                  type="range"
                  min="12"
                  max="26"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
              </div>
            </div>

            <h2 className="cat-title">{t("choose_category")}</h2>

            <div className="category-container">
              {categories.map((c) => (
                <div
                  key={c.key}
                  className="category-card"
                  onClick={() => goBooking(c.key)}
                >
                  <div className="card-icon">{c.icon}</div>
                  <p>{c.label}</p>
                </div>
              ))}
            </div>

            <div className="route-box">
              <label>{t("source")}</label>
              <input value={source} onChange={(e) => setSource(e.target.value)} />

              <label>{t("destination")}</label>
              <input value={destination} onChange={(e) => setDestination(e.target.value)} />

              <button className="route-btn" onClick={getRoute}>
                {t("get_route")}
              </button>

              <button className="safe-btn" onClick={getSaferRoute}>
                {t("safer_route")}
              </button>
            </div>

            <div className="safety-panel">
              <p>
                <b>Hazards:</b> {hazards}
              </p>
              <p>
                <b>AI Risk:</b> {aiRisk}
              </p>
              <p>
                <b>Safety Score:</b> {safetyScore}
              </p>
            </div>

            <HyderabadMap routeData={routeData} />

            {routeData && (
              <button className="route-btn" onClick={() => setShowNav(true)}>
                Start Navigation
              </button>
            )}

            {showNav && (
              <NavigationPanel routeData={routeData} close={() => setShowNav(false)} />
            )}
          </div>
        }
      />

      {/* ================= BOOKING SCREEN ================= */}
      <Route path="/booking" element={<BookingScreen />} />
    </Routes>
  );
};

export default App;
