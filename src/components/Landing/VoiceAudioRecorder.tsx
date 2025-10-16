// src/components/VoiceRecorder.tsx
import React, { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

interface VoicePost {
  id: number;
  user: string;
  language: string;
  topic: string;
  audioUrl: string;
  date: string;
}

export const VoiceAudioRecorder: React.FC = () => {
  const recorderControls = useAudioRecorder();
  const [recordings, setRecordings] = useState<VoicePost[]>([]);
  const [language, setLanguage] = useState("en-US");
  const [topic, setTopic] = useState("");

  const addAudioElement = (blob: Blob) => {
    const audioUrl = URL.createObjectURL(blob);

    const newPost: VoicePost = {
      id: Date.now(),
      user: "Anonymous Learner",
      language,
      topic: topic || "General",
      audioUrl,
      date: new Date().toLocaleString(),
    };

    setRecordings((prev) => [newPost, ...prev]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎧 Voice Recorder</h2>

      <div style={styles.inputSection}>
        <label>Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. My opinion about learning Spanish"
          style={styles.input}
        />

        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={styles.select}
        >
          <option value="en-US">English</option>
          <option value="es-MX">Español (México)</option>
          <option value="fr-FR">Français</option>
          <option value="de-DE">Deutsch</option>
        </select>
      </div>

      <AudioRecorder
        onRecordingComplete={addAudioElement}
        recorderControls={recorderControls}
        downloadOnSavePress={false}
        showVisualizer={true}
      />

      <h3 style={{ marginTop: "2rem" }}>🗂️ Your Recorded Posts</h3>
      {recordings.length === 0 && <p>No posts yet. Start recording!</p>}

      {recordings.map((rec) => (
        <div key={rec.id} style={styles.postCard}>
          <p><strong>{rec.topic}</strong> ({rec.language})</p>
          <audio controls src={rec.audioUrl} style={{ width: "100%" }} />
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            Posted by {rec.user} — {rec.date}
          </p>
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, any> = {
  container: {
    padding: "2rem",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#13063eff",
    borderRadius: "12px",
    maxWidth: "700px",
    margin: "2rem auto",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  title: { marginBottom: "1rem", color: "#007acc" },
  inputSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "0.5rem",
  },
  select: {
    padding: "0.4rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  postCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
  },
};
