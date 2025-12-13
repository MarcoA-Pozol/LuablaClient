import React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "../../styles/HubView/CreatePostForm.css";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { useTranslation } from "react-i18next";
import { handleObjectCreation, clearFormFields } from "../../functions/handleObjectCreation";
import { createNotification } from "../../functions/createNotification";
import { useLanguages } from "../../hooks/useLanguages";

type CreatePostFormProps = {
  showCreatePostForm: boolean;
  setShowCreatePostForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  showCreatePostForm,
  setShowCreatePostForm,
}) => {
  const { t } = useTranslation();
  const { languageToLearn } = useLanguages();
  
  // Audio recorder controls
  const recorderControls = useAudioRecorder();

  const handlePostCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    
    // Get audio blob if exists
    let audioBlob: Blob | null = null;
    if (recorderControls.recordingBlob) {
      audioBlob = recorderControls.recordingBlob;
      // Convert blob to File for FormData
      const audioFile = new File([audioBlob], `voicepost_${Date.now()}.webm`, {
        type: audioBlob.type || "audio/webm",
      });
      data.append("speech", audioFile);
    }
    
    // Get opinion mode from form
    const opinionElement = form.querySelector('[name="opinion_type"]') as HTMLInputElement;
    const opinionMode = opinionElement?.value || "none";
    data.append("opinion_type", opinionMode);
    
    // Submit the form
    handleObjectCreation(
      event, 
      useBaseApiUrl("/hub/post"), 
      {}, 
      { "Content-Type": "multipart/form-data" }, 
      "post"
    );
    
    // Clear form fields
    clearFormFields(form, languageToLearn);
    
    // Create notification
    await createNotification(
      "Published Post!", 
      `You published a new post.\nTitle:${data.get("title")}\nLanguage:${languageToLearn}`, 
      "CREATED_POST"
    );
    
    // Close form after submission
    setShowCreatePostForm(false);
  };

  return (
    <>
      {showCreatePostForm && (
        <div className="createpost-overlay" onClick={() => setShowCreatePostForm(false)}>
          <form
            onSubmit={handlePostCreation}
            className="createpost-modal"
            method="POST"
            encType="multipart/form-data"
            onClick={(e) => e.stopPropagation()}
          >
              <div className="createpost-card">
                <header className="createpost-header">
                  <h2>{t("Create New Post")}</h2>
                  <button
                    className="createpost-close"
                    type="button"
                    title={t("Close")}
                    onClick={() => setShowCreatePostForm(false)}
                  >
                    ✕
                  </button>
                </header>

                {/* Hidden field for opinion_type */}
                <input type="hidden" name="opinion_type" value="none" />

                <label className="field">
                  <span>{t("Title")}</span>
                  <input
                    type="text"
                    name="title"
                    placeholder={t("Title...")}
                    required
                    maxLength={150}
                  />
                </label>

                {/* Written opinion field - conditionally rendered in JS if needed */}
                <label className="field">
                  <span>{t("Your Opinion (Written)")}</span>
                  <textarea
                    name="opinion"
                    placeholder={t("Write Your Opinion About The Post (Optional)...")}
                    rows={4}
                  />
                </label>

                {/* Audio recorder - you might want to conditionally show this */}
                <div className="field">
                  <span>{t("Your Opinion (Recorded)")}</span>
                  <AudioRecorder
                    onRecordingComplete={(blob) => {
                      // Store the blob in recorderControls
                      recorderControls.recordingBlob = blob;
                    }}
                    recorderControls={recorderControls}
                    downloadOnSavePress={false}
                    showVisualizer={true}
                  />
                </div>

                <label className="field">
                  <span>{t("Image (optional)")}</span>
                  <input type="file" name="image" accept="image/*" />
                </label>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => setShowCreatePostForm(false)}
                  >
                    {t("Cancel")}
                  </button>
                  <button type="submit" className="btn primary">
                    {t("Publish")}
                  </button>
                </div>
              </div>
          </form>
        </div>
      )}
    </>
  );
};