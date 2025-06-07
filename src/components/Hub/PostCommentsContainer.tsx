import { useState } from "react";
import type { PostCommentsContainerI } from "../../interfaces/Post";
import { AddPostCommentForm } from "./AddPostCommentForm";
import { timeAgo } from "../../functions/timeAgo";
import "../../styles/HubView/PostCommentsContainer.css";
import { useTranslation } from "react-i18next";
import { ImageSVG, AudioSVG, EmptyCommentsSVG } from "../General/Svgs";
import { ImageModal } from "../General/ImageModal"; // Importa el modal

export const PostCommentsContainer = ({ post, openComments }: PostCommentsContainerI) => {
  const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);
  const hasComments = post.comments.length > 0;
  const {t} = useTranslation();

  // Handle Image Modal
  const handleImageClick = (imageUrl: string, username: string) => {
    setSelectedImage({
      url: `http://localhost:8600/${imageUrl}`,
      alt: `Image from ${username}`
    });
  };

  // Close Image Modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className={`comments-container ${openComments[post.id] ? "open" : ""}`}>
        {/* Comments List */}
        <div className="comments-list">
          {hasComments ? (
            post.comments.map((comment, index) => {
              const hasAudio = !!comment.speech;
              const hasImage = !!comment.image;
              const hasMedia = hasAudio || hasImage;
              const isNewComment = index === post.comments.length - 1;

              return (
                <div 
                  key={comment.id} 
                  className={`comment-item ${isNewComment ? 'new-comment' : ''} ${hasMedia ? 'comment-with-media' : ''}`}
                >
                  <div className="comment-header">
                    <div className="comment-user">
                      <img 
                        src={`http://localhost:8600/media/${comment.author.profile_picture}`} 
                        className="comment-user-avatar" 
                        alt={comment.author.username}
                      />
                      <span>{comment.author.username}</span>
                    </div>
                    <p className="comment-created-at">{timeAgo(comment.created_at)}</p>
                  </div>

                  {comment.comment && (
                    <p className="comment-content">{comment.comment}</p>
                  )}

                  {(hasAudio || hasImage) && (
                    <div className={`comment-media-container ${hasAudio && hasImage ? 'comment-with-audio-image' : ''}`}>
                      {/* Audio */}
                      {hasAudio && (
                        <div className="comment-media-item">
                          <audio 
                            controls 
                            src={`http://localhost:8600/${comment.speech}`}
                            preload="metadata"
                          />
                          <div className="comment-type-badge">
                            <AudioSVG />
                            <span>{t("Audio")}</span>
                          </div>
                        </div>
                      )}

                      {/* Image */}
                      {hasImage && (
                        <div className="comment-image-container">
                          <img 
                            src={`http://localhost:8600/${comment.image}`} 
                            className="comment-image clickable-image"
                            alt={`Imagen de ${comment.author.username}`}
                            loading="lazy"
                            onClick={() => handleImageClick(comment.image!, comment.author.username)}
                            style={{ cursor: 'pointer' }}
                          />
                          <div className="comment-type-badge">
                            <ImageSVG />
                            <span>{t("Image")}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="comments-empty">
              <EmptyCommentsSVG />
              <p>{t("There are no comments yet. Be the first on commenting!")}</p>
            </div>
          )}
        </div>

        <AddPostCommentForm post={post} />
      </div>

      {/* Image Modal Display */}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          altText={selectedImage.alt}
          onClose={closeImageModal}
        />
      )}
    </>
  );
};