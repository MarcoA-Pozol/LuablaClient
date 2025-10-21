import React, { useState, useCallback } from "react";
import axios from "axios";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "../../styles/HubView/CreatePostForm.css"
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { useTranslation } from "react-i18next";

type CreatePostFormProps = {
  setShowCreatePostForm: React.Dispatch<React.SetStateAction<boolean>>;
  onCreated?: (createdItem?: any) => void; // optional callback after success
};

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  setShowCreatePostForm,
  onCreated,
}) => {
    const { t } = useTranslation();

  // Form state
  const [title, setTitle] = useState("");
  const [opinionText, setOpinionText] = useState("");
  const [opinionMode, setOpinionMode] = useState<"written" | "spoken" | "none">("none");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Audio recorder controls (react-audio-voice-recorder)
  const recorderControls = useAudioRecorder();

  // Constants for validation
  const MAX_IMAGE_BYTES = 6 * 1024 * 1024; // 6 MB
  const MAX_AUDIO_BYTES = 8 * 1024 * 1024; // 8 MB
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const ALLOWED_AUDIO_TYPES = ["audio/mpeg", "audio/webm", "audio/wav", "audio/ogg"];

  // Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setImageFile(null);
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setErrorMsg("Formato de imagen no soportado. Usa: JPG, PNG o WEBP.");
      setImageFile(null);
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setErrorMsg("Imagen demasiado grande. Máx 6 MB.");
      setImageFile(null);
      return;
    }

    setImageFile(file);
  };

  // called by AudioRecorder when recording completes
  const handleRecordingComplete = useCallback((blob: Blob) => {
    setErrorMsg(null);
    if (blob.size > MAX_AUDIO_BYTES) {
      setErrorMsg("Audio demasiado grande. Máx 8 MB.");
      setAudioBlob(null);
      return;
    }
    // If contentType is not provided reliably, we assume the recorder produces webm/ogg
    // (we trust the backend to validate further)
    setAudioBlob(blob);
    setOpinionMode("spoken"); // set mode to spoken when a recording is present
  }, []);

  // Toggle opinion mode (written <-> spoken <-> none)
  const toggleOpinionFormat = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (opinionMode === "none") setOpinionMode("written");
    else if (opinionMode === "written") setOpinionMode("spoken");
    else setOpinionMode("none");
  };

  // Submit handler: async function but uses then/catch per your request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic client-side checks
    if (!title.trim()) {
      setErrorMsg("El título es obligatorio.");
      return;
    }

    // If opinionMode is written but text empty, allow — per your earlier note it's optional
    // But if opinionMode is spoken and no audio captured, warn
    if (opinionMode === "spoken" && !audioBlob) {
      setErrorMsg("Seleccionaste opinión hablada pero no hay audio grabado.");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", title);
    if (opinionText && opinionMode === "written") {
      formData.append("opinion", opinionText);
    }
    // If spoken opinion is present, append it as file
    if (audioBlob && opinionMode === "spoken") {
      // Derive a filename; prefer .webm by default
      const audioFile = new File([audioBlob], `voicepost_${Date.now()}.webm`, {
        type: audioBlob.type || "audio/webm",
      });
      // final validation (type + size) before sending
      if (!ALLOWED_AUDIO_TYPES.includes(audioFile.type)) {
        setErrorMsg("Formato de audio no soportado. Usa MP3, WEBM, WAV u OGG.");
        return;
      }
      if (audioFile.size > MAX_AUDIO_BYTES) {
        setErrorMsg("Audio demasiado grande. Máx 8 MB.");
        return;
      }
      formData.append("speech", audioFile);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append("opinion_type", opinionMode);

    setSubmitting(true);
    try {
      await axios
        .post(useBaseApiUrl("/hub/create_post"), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          setSuccessMsg("Post creado correctamente.");
          if (onCreated) onCreated(response.data);
          setShowCreatePostForm(false);
        })
        .catch((err) => {
          console.error("Error creando post:", err);
          if (err.response?.data) {
            setErrorMsg(JSON.stringify(err.response.data));
          } else {
            setErrorMsg("Error de red o del servidor al crear el post.");
          }
        });
    } catch (outerErr) {
      console.error("Unexpected error:", outerErr);
      setErrorMsg("Error inesperado al enviar la petición.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="createpost-overlay" onClick={() => setShowCreatePostForm(false)} />

      <div className="createpost-modal" role="dialog" aria-modal="true" aria-label="Crear nuevo post">
        <div className="createpost-card" onClick={(e) => e.stopPropagation()}>
          <header className="createpost-header">
            <h2>Crear un nuevo post</h2>
            <button
              className="createpost-close"
              type="button"
              title="Cerrar"
              onClick={() => setShowCreatePostForm(false)}
            >
              ✕
            </button>
          </header>

          <form className="createpost-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>{t("Title")}</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("Title...")}
                required
                maxLength={150}
              />
            </label>

            <div className="field inline">
              <label>{t("Opinion Format")}:</label>
              <button type="button" className="toggle-btn" onClick={toggleOpinionFormat}>
                {opinionMode === "none" && t("Choose (None Yet)")}
                {opinionMode === "written" && t("Written (Current)")}
                {opinionMode === "spoken" && t("Spoken (Current)")}
              </button>
            </div>

            {opinionMode === "written" && (
              <label className="field">
                <span>{t("Your Opinion (Written)")}</span>
                <textarea
                  value={opinionText}
                  onChange={(e) => setOpinionText(e.target.value)}
                  placeholder={t("Write Your Opinion About The Post (Optional)...")}
                  rows={4}
                />
              </label>
            )}

            {opinionMode === "spoken" && (
              <div className="field">
                <span>{t("Your Opinion (Recorded)")}</span>
                <AudioRecorder
                  onRecordingComplete={handleRecordingComplete}
                  recorderControls={recorderControls}
                  downloadOnSavePress={false}
                  showVisualizer={true}
                />
                {audioBlob && (
                  <div style={{ marginTop: 8 }}>
                    <strong>{t("Record is Ready")}:</strong>{" "}
                    <audio controls src={URL.createObjectURL(audioBlob)} />
                  </div>
                )}
              </div>
            )}

            <label className="field">
              <span>Imagen (opcional)</span>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imageFile && (
                <div style={{ marginTop: 8 }}>
                  <strong>Imagen seleccionada:</strong> {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
            </label>

            {errorMsg && <div className="form-error">{t(errorMsg)}</div>}
            {successMsg && <div className="form-success">{t(successMsg)}</div>}

            <div className="form-actions">
              <button type="button" title={t("Cancel Post Creation")} className="btn secondary" onClick={() => setShowCreatePostForm(false)}>
                {t("Cancel")}
              </button>
              <button type="submit" className="btn primary" disabled={submitting}>
                {submitting ? t("Sending...") : t("Create Post")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
