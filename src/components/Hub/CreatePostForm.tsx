import React from "react";
import "../../styles/HubView/CreatePostForm.css";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { useTranslation } from "react-i18next";
import { handleObjectCreation, clearFormFields } from "../../functions/handleObjectCreation";
import { createNotification } from "../../functions/createNotification";
import { useLanguages } from "../../hooks/useLanguages";
import { usePosts } from "../../hooks/usePosts";
import { useSocialData } from "../../hooks/useSocialData";
import type { Post } from "../../schemas/Post";
import { useAuth } from "../../App";
import AudioRecorder from "../General/AudioRecorder";

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
  const { fetchNotifications } = useSocialData();
  const {setPostsList} = usePosts();
  const {authUser} = useAuth();
  

  const handlePostCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Submit the form, get the created post and add it to the list
    const responseData = await handleObjectCreation(
      event,
      useBaseApiUrl("/hub/post"),
      {},
      { "Content-Type": "multipart/form-data" },
      "post"
    );

    if (!responseData) {
      return;
    }

    const newPost = responseData.item as Post
    
    // Clear form fields
    clearFormFields(form, languageToLearn);
    
    // Create notification
    await createNotification(
      authUser.username,
      "Published Post!", 
      `You published a new post.\nTitle:${data.get("title")}\nLanguage:${languageToLearn}`, 
      "CREATED_POST"
    );

    fetchNotifications();

    setPostsList(prev => [newPost, ...prev]); // Update postsList after creation by locally adding the new post to the existing posts list (Better performance - less consistency)

    setShowCreatePostForm(false); // Close form after submission
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

                <input type="hidden" name="language" value={languageToLearn} />


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

                <AudioRecorder/>

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