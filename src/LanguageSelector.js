import React from "react";

function LanguageSelector({ lang, setLang }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        style={{ padding: "6px", fontSize: "16px" }}
      >
        <option value="en">English</option>
        <option value="te">తెలుగు</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
