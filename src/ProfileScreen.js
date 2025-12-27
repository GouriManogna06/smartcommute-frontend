import React from "react";
import "./ProfileScreen.css";
import { useTranslation } from "react-i18next";

export default function ProfileScreen({ close }) {
  const { t } = useTranslation();

  return (
    <div className="profile-overlay">
      <div className="profile-box">
        
        <button className="profile-close" onClick={close}>✖</button>

        <h2>{t("profile")}</h2>

        <div className="profile-section">
          <label>Name:</label>
          <p>Garimella Gouri Manogna</p>
        </div>

        <div className="profile-section">
          <label>Email:</label>
          <p>example@gmail.com</p>
        </div>

        <div className="profile-section">
          <label>Phone:</label>
          <p>+91 XXXXX XXXXX</p>
        </div>

        <div className="profile-section">
          <label>Preferred Category:</label>
          <p>General</p>
        </div>

        <div className="profile-section">
          <label>App Settings:</label>
          <ul>
            <li>Font Size</li>
            <li>Language Selection</li>
            <li>Voice Assistant</li>
            <li>Safety Alerts</li>
          </ul>
        </div>

        <button className="logout-btn">{t("logout")}</button>
      </div>
    </div>
  );
}
