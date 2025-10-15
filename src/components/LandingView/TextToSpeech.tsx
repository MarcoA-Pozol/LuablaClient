import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

export const TextToSpeech: React.FC = () => {
  const { speak, voices, cancel } = useSpeechSynthesis();
  const [text, setText] = useState("Hello, world!");
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Filter only voices with language identifiers
  const availableVoices = voices.filter(v => v.lang && v.name);

  useEffect(() => {
    if (availableVoices.length > 0 && !selectedVoice) {
      setSelectedVoice(availableVoices[0]);
    }
  }, [voices]);

  const handleSpeak = () => {
    if (!text.trim()) return;
    if (selectedVoice) {
      speak({ text, voice: selectedVoice });
    }
  };

  return (
    <div
      style={{
        margin: "2rem auto",
        maxWidth: "500px",
        padding: "1.5rem",
        borderRadius: "12px",
        backgroundColor: "#150a37ff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>🗣️ Text to Speech</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something to read aloud..."
        rows={4}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
      />

      <label htmlFor="voice-select">🌍 Choose language/voice:</label>
      <select
        id="voice-select"
        value={selectedVoice?.name}
        onChange={(e) =>
          setSelectedVoice(availableVoices.find((v) => v.name === e.target.value) || null)
        }
        style={{
          width: "100%",
          padding: "0.5rem",
          margin: "0.5rem 0 1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        {availableVoices.map((v) => (
          <option key={v.name} value={v.name}>
            {v.name} ({v.lang})
          </option>
        ))}
      </select>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={handleSpeak}
          style={{
            flex: 1,
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "0.75rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔊 Speak
        </button>
        <button
          onClick={cancel}
          style={{
            flex: 1,
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "0.75rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🛑 Stop
        </button>
      </div>
    </div>
  );
};
