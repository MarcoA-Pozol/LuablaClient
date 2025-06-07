import { useTranslation } from "react-i18next";
import { createNotification } from "../../functions/createNotification";
import { useAuth } from "../../App";
import type { Post, PostComment } from "../../schemas/Post";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { usePosts } from "../../hooks/usePosts";
import { useSocialData } from "../../hooks/useSocialData";
import AudioRecorder from "../General/AudioRecorder";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { clearFormFields } from "../../functions/handleObjectCreation";
import { useLanguages } from "../../hooks/useLanguages";
import "../../styles/HubView/AddPostCommentForm.css";

// Íconos SVG (puedes reemplazar con tu propia librería de íconos)
const AttachmentIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
  </svg>
);

interface AddPostCommentFormI {
  post: Post;
}

export const AddPostCommentForm = ({ post }: AddPostCommentFormI) => {
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const { setPostsList } = usePosts();
  const { fetchNotifications } = useSocialData();
  const [audioRecord, setAudioRecord] = useState<Blob | null>(null);
  const { languageToLearn } = useLanguages();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-ajustar altura del textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 60)}px`;
    }
  }, []);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 60)}px`;
    
    // Agregar/remover clase para estilo
    const wrapper = textarea.closest('.comment-input-wrapper');
    if (wrapper) {
      if (textarea.value.trim()) {
        wrapper.classList.add('has-content');
      } else {
        wrapper.classList.remove('has-content');
      }
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handlePostCommentCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    if (audioRecord) {
      data.append("speech", audioRecord, "speech.webm");
      // Reset audio después de enviar
      setAudioRecord(null);
    }

    data.append("post_id", String(post.id));

    try {
      const response = await axios.post(
        useBaseApiUrl("/hub/postComment"),
        data,
        { withCredentials: true }
      );

      const responseData = response.data;

      if (!responseData) return;

      const newComment = responseData.item as PostComment;

      setPostsList(prevPosts =>
        prevPosts.map(p =>
          p.id === post.id
            ? {
              ...p,
              comments: [...p.comments, newComment]
            }
            : p
        )
      );

      // Notificaciones
      await createNotification(
        authUser.username,
        `Comment added to "${post.title}"`,
        `You commented on ${post.author.username}'s post.`,
        "POST_COMMENT"
      );

      await createNotification(
        post.author.username,
        `New comment on your post`,
        `${authUser?.username ?? 'Someone'} commented on your post "${post.title}": "${newComment.comment.toString().slice(0, 100)}${newComment.comment.toString().length > 100 ? '...' : ''}"`,
        "POST_COMMENT"
      );
      
      fetchNotifications();

      // Limpiar formulario
      form.reset();
      clearFormFields(form, languageToLearn);
      
      // Resetear textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.closest('.comment-input-wrapper')?.classList.remove('has-content');
      }

    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <form
      onSubmit={handlePostCommentCreation}
      className="add-comment"
      method="POST"
      encType="multipart/form-data"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="comment-input-wrapper">
        <textarea
          ref={textareaRef}
          placeholder={t("Write a comment...")}
          className="comment-textarea"
          name="comment"
          rows={1}
          onInput={handleTextareaInput}
        />
        
        <div className="comment-actions">
          {/* Grabador de audio */}
          <AudioRecorder 
            audioSetter={setAudioRecord} 
            compact={true}
          />
          
          {/* Input de archivo con ícono */}
          <div className="file-input-wrapper" data-tooltip={t("Add image")}>
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="file-input-label"
              onClick={handleFileButtonClick}
              aria-label={t("Add image")}
            >
              <AttachmentIcon />
            </button>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className={`comment-button ${audioRecord ? 'has-audio' : ''}`}
        disabled={!textareaRef.current?.value.trim() && !audioRecord}
      >
        {t("Post")}
      </button>
    </form>
  );
};