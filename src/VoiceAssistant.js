import React, { useState } from "react";

function VoiceAssistant({ speakText, onCommand }) {
  const [listening, setListening] = useState(false);

  // Speak functionality
  const handleSpeak = () => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(speakText);
    msg.lang = "en-IN";
    window.speechSynthesis.speak(msg);
  };

  // Listen functionality
  const handleListen = () => {
    window.speechSynthesis.cancel(); // stop speaking if speaking

    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const listener = new recognition();
    listener.lang = "en-IN";
    listener.start();
    setListening(true);

    listener.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setListening(false);
      onCommand(transcript);
    };

    listener.onerror = () => {
      setListening(false);
    };
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <button
        onClick={handleSpeak}
        style={{
          padding: "10px 15px",
          marginRight: "10px",
          background: "#007bff",
          color: "#fff"
        }}
      >
        🔊 Speak
      </button>

      <button
        onClick={handleListen}
        style={{
          padding: "10px 15px",
          background: listening ? "red" : "green",
          color: "#fff"
        }}
      >
        🎤 Listen
      </button>
    </div>
  );
}

export default VoiceAssistant;
