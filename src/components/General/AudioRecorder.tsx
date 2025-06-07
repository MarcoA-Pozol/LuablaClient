import { useRef, useState, useEffect } from "react";
import "../../styles/audioRecorder.css";
import { useTranslation } from "react-i18next";

interface AudioRecorderI {
  audioSetter: (audio: Blob | null) => void;
  compact?: boolean;
}

const AudioRecorder = ({ audioSetter, compact = false }: AudioRecorderI) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const {t} = useTranslation();

  // Record timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        setAudioURL(URL.createObjectURL(blob));
        audioSetter(blob);
        
        // Stop all stream tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error(t("Error to access the microphone:"), error);
      alert(t("Verify permissions, please."));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearAudio = () => {
    setAudioURL(null);
    audioSetter(null);
  };

  // Format record time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Compact mode view
  if (compact) {
    return (
      <div className={`audio-recorder compact ${isRecording ? 'recording' : ''} ${audioURL ? 'has-audio' : ''}`}>
        {!audioURL ? (
          <button
            type="button"
            className={`record-button ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            aria-label={isRecording ? "Stop recording" : "Record"}
            data-tooltip={isRecording ? "Stop" : "Record"}
          >
            {isRecording ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15Z"/>
                <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12M12 19V21M8 21H16"/>
              </svg>
            )}
          </button>
        ) : (
          <div className="compact-audio-player">
            <audio controls src={audioURL} className="compact-audio" />
            <button
              type="button"
              className="clear-audio"
              onClick={clearAudio}
              aria-label="Delete"
              data-tooltip="Delete"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        )}
        
        {isRecording && (
          <div className="compact-timer">
            <span className="recording-dot" />
            <span>{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>
    );
  }

  // Complete version view by default
  return (
    <div className="audio-recorder">
      <div className="controls">
        {!audioURL ? (
          <>
            <button
              type="button"
              className={`record-button ${isRecording ? 'recording' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <>
                  <span className="stop-icon" />
                  Stop
                </>
              ) : (
                <>
                  <span className="mic-icon" />
                  Record Audio
                </>
              )}
            </button>

            {isRecording && (
              <div className="recording-indicator">
                <span className="dot" />
                <span>Listening... {formatTime(recordingTime)}</span>
              </div>
            )}
          </>
        ) : (
          <div className="audio-actions">
            <button
              type="button"
              className="record-again"
              onClick={() => {
                clearAudio();
                startRecording();
              }}
            >
              Record Again
            </button>
            <button
              type="button"
              className="clear-audio"
              onClick={clearAudio}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {audioURL && (
        <div className="playback">
          <div className="audio-player">
            <audio controls src={audioURL}>
              Your web browser does not support the audio reproduction.
            </audio>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;