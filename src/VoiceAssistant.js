import React, { useRef, useState } from "react";

const VoiceAssistant = ({ onCategory }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const speakCategories = () => {
    const msg = new SpeechSynthesisUtterance(
      "Please say a category. You can choose: General, Specially Abled, With Helper, Pet Owners, Parents with Children, or Parents with Infants."
    );
    msg.lang = "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  const startListening = () => {
    window.speechSynthesis.cancel();

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
      const text = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", text);
      setListening(false);

      if (text.includes("general")) onCategory("general");
      else if (text.includes("special")) onCategory("special");
      else if (text.includes("helper")) onCategory("helper");
      else if (text.includes("pet")) onCategory("pet");
      else if (text.includes("child")) onCategory("child");
      else if (text.includes("infant")) onCategory("infant");
      else alert("Category not recognized");
    };

    recognitionRef.current.onerror = () => {
      setListening(false);
    };

    recognitionRef.current.start();
  };

  return (
    <div className="voice-box">
      <button className="speak-btn" onClick={speakCategories}>
        🔊 Speak
      </button>

      <button
        className="listen-btn"
        onClick={startListening}
        style={{ backgroundColor: listening ? "red" : "green" }}
      >
        🎤 {listening ? "Listening..." : "Listen"}
      </button>
    </div>
  );
};

export default VoiceAssistant;
