import { useRef, useState } from "react";

interface AudioRecorderI {
    audioSetter: (audio: Blob | null) => void;
}

const AudioRecorder = ({audioSetter}:AudioRecorderI) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
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
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <h2>Grabador de Audio</h2>

      {!isRecording ? (
        <button type="button" onClick={startRecording}>Grabar</button>
      ) : (
        <button type="button" onClick={stopRecording}>Detener</button>
      )}

      {audioURL && (
        <div>
          <h3>Reproducción</h3>
          <audio controls src={audioURL} />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
