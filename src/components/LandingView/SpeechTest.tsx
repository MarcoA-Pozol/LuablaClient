// MicListener.tsx
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const MicListener: React.FC = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>🎤 Microphone Listener</h2>
      <button onClick={startListening} disabled={listening}>Start Listening</button>
      <button onClick={stopListening} disabled={!listening}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <div style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
        <strong>Transcript:</strong>
        <span style={{ marginLeft: '0.5rem', color: '#333' }}>{transcript || '...'}</span>
      </div>
    </div>
  );
};
