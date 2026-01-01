import React, { useState, useEffect, useRef } from "react";
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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const App = () => {
  const { t, i18n } = useTranslation();

  // STATES
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

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  // CATEGORY CARDS
  const categories = [
    { key: "general", icon: <FaMotorcycle />, label: t("general") },
    { key: "special", icon: <FaWheelchair />, label: t("special") },
    { key: "helper", icon: <FaUsers />, label: t("helper") },
    { key: "pet", icon: <FaDog />, label: t("pet") },
    { key: "child", icon: <FaBaby />, label: t("child") },
    { key: "infant", icon: <GiJourney />, label: t("infant") },
  ];

  // Open booking screen
  const goBooking = (cat) => {
    navigate(`/booking?category=${cat}`);
  };

  // Detect online/offline
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

  // ----------------------------
  // 🔵 VOICE SPEAK FUNCTION
  // ----------------------------
  const speakCategories = () => {
    const msg = new SpeechSynthesisUtterance(
      "Please say a category. You can choose: General, Specially Abled, With Helper, Pet Owners, Parents with Children or Parents with Infants."
    );
    msg.lang = "en-IN";
    window.speechSynthesis.speak(msg);
  };

  // ----------------------------
  // 🔴 VOICE LISTEN FUNCTION
  // ----------------------------
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = "en-IN";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.continuous = false;

    setListening(true);

    recognitionRef.current.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", command);

      if (command.includes("general")) goBooking("general");
      else if (command.includes("special")) goBooking("special");
      else if (command.includes("helper")) goBooking("helper");
      else if (command.includes("pet")) goBooking("pet");
      else if (command.includes("child")) goBooking("child");
      else if (command.includes("infant")) goBooking("infant");
      else alert("Category not recognized.");

      setListening(false);
    };

    recognitionRef.current.onerror = () => {
      setListening(false);
    };

    recognitionRef.current.start();
  };

  // ----------------------------
  // 📍 ROUTING REQUEST (USING DEPLOYED BACKEND)
  // ----------------------------
  const getRoute = async () => {
    if (!source || !destination) {
      alert("Enter source and destination");
      return;
    }

    try {
      const res = await fetch(
        `${BACKEND_URL}/routing/route?source=${source}&destination=${destination}`
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

  // ----------------------------------------------------
  // MAIN UI
  // ----------------------------------------------------
  return (
    <Routes>
      {/* HOME SCREEN */}
      <Route
        path="/"
        element={
          <div className="app-container" style={{ fontSize: `${fontSize}px` }}>
            {profileOpen && (
              <ProfileScreen close={() => setProfileOpen(false)} />
            )}

            <header className="header">
              <h1>{t("title")}</h1>
              <button className="profile-btn" onClick={() => setProfileOpen(true)}>
                👤
              </button>
            </header>

            {!isOnline && <div className="offline-banner">{t("offline")}</div>}

            {/* Language + Font */}
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

            {/* VOICE ASSISTANT */}
            <div className="voice-box">
              <button className="speak-btn" onClick={speakCategories}>
                🔊 Speak
              </button>

              <button
                className="listen-btn"
                style={{ backgroundColor: listening ? "red" : "green" }}
                onClick={startListening}
              >
                🎤 {listening ? "Listening..." : "Listen"}
              </button>
            </div>

            <h2 className="cat-title">{t("choose_category")}</h2>

            {/* Categories */}
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

            {/* Route Box */}
            <div className="route-box">
              <label>{t("source")}</label>
              <input value={source} onChange={(e) => setSource(e.target.value)} />

              <label>{t("destination")}</label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />

              <button className="route-btn" onClick={getRoute}>
                {t("get_route")}
              </button>

              <button className="safe-btn" onClick={getSaferRoute}>
                {t("safer_route")}
              </button>
            </div>

            {/* Safety Panel */}
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

            {/* Map */}
            <HyderabadMap routePolyline={routeData?.polyline || []} />

            {routeData && (
              <button className="route-btn" onClick={() => setShowNav(true)}>
                Start Navigation
              </button>
            )}

            {showNav && (
              <NavigationPanel
                routeData={routeData}
                close={() => setShowNav(false)}
              />
            )}
          </div>
        }
      />

      {/* BOOKING SCREEN */}
      <Route path="/booking" element={<BookingScreen />} />
    </Routes>
  );
};

export default App;
