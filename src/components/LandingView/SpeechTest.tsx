// MicListener.tsx
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const MicListener: React.FC = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div style={{
        padding: '2rem',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#100f31ff',
        border: '1px solid #ffcccc',
        borderRadius: '12px',
        maxWidth: '500px',
        margin: '2rem auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#cc0000' }}>🚫 Speech Recognition Not Supported</h3>
        <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Please use one of the supported browsers below for full functionality:</p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '0.95rem' }}>
          <li><strong>✅ Google Chrome</strong> – Fully Supported</li>
          <li><strong>✅ Microsoft Edge</strong> – Fully Supported</li>
          <li><strong>⚠️ Opera</strong> – May Work Inconsistently</li>
          <li><strong>⚠️ Safari</strong> – No Native Support</li>
          <li><strong>❌ Firefox</strong> – Not Supported</li>
          <li><strong>❌ Brave</strong> – Not Supported</li>
        </ul>
      </div>
    );
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#100f31ff',
      borderRadius: '12px',
      maxWidth: '600px',
      margin: '2rem auto',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '1rem', color: '#007acc' }}>🎤 Microphone Listener</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={startListening}
          disabled={listening}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: listening ? '#ccc' : '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: listening ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!listening}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: !listening ? '#ccc' : '#ff6600',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: !listening ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Stop Listening
        </button>
        <button
          onClick={resetTranscript}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#999',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          Reset
        </button>
      </div>
      <div style={{
        marginTop: '1rem',
        fontSize: '1.2rem',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        color: '#333'
      }}>
        <strong>Transcript:</strong>
        <span style={{ marginLeft: '0.5rem', fontStyle: 'italic' }}>{transcript || '...'}</span>
      </div>
    </div>
  );
};
