import { useState } from "react";
import { useTranslation } from "react-i18next";
import {FaChevronDown, FaChevronUp, FaCommentDots, FaClock,} from "react-icons/fa";
import "../../styles/HubView/PostsContainer.css";
import { CreatePostForm } from "./CreatePostForm";
import { usePosts } from "../../hooks/usePosts";

export const PostsContainer = () => {
  const { t } = useTranslation();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});
  const {postsList} = usePosts(); // id, topic, author (name, profile_image), opinion, record/audio, image, date, comments of the post(id, username, comment, audio, image)

  const toggleComments = (postId: number) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="posts-container">
      {postsList.map((post) => (
        <div key={post.id} className="post-card">
          <p className="author-label">
            <FaClock /> {post.created_at}
          </p>

          <h2 className="post-topic">{post.title}</h2>

          <div className="post-author">
            <img src={`http://localhost:8600/${post.author.profilePicture}`} alt={post.author.profilePicture}/>  
            <div>
              <p className="author-name">{post.author.username}</p>
              <p className="author-label">Author</p>
            </div>
          </div>

          <div className="post-answer">
            <p>{post.opinion}</p>
          </div>

          {post.image && <img id="post-image" src={`http://localhost:8600/${post.image}`} alt={post.image}/>  }

          {/* Comments Section */}
          <button
            onClick={() => toggleComments(post.id)}
            className="comments-toggle"
          >
            <FaCommentDots />
            {openComments[post.id] ? (
              <>
                &nbsp;Hide Comments <FaChevronUp />
              </>
            ) : (
              <>
                &nbsp;View Comments ({post.comments.length}) <FaChevronDown />
              </>
            )}
          </button>

          <div
            className={`comments-container ${
              openComments[post.id] ? "open" : ""
            }`}
          >
            <div className="comments-list">
              {post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p className="comment-user">{comment.author.username}</p>
                  <p className="comment-content">{comment.opinion}</p>
                </div>
              ))}
            </div>

            {/* Add comment input */}
            <div className="add-comment">
              <textarea
                placeholder={t("Write your comment here...")}
                className="comment-textarea"
              ></textarea>
              <button className="comment-button">
                {t("Post Comment")}
              </button>
            </div>
          </div>
        </div>
      ))}

      <p className="language-footer">
        {t("Don’t forget to respect other people's opinions while commenting")}
      </p>

      <button onClick={() => {setShowCreatePostForm(true)}}>Create Post +</button>
      {showCreatePostForm === true &&
        <CreatePostForm setShowCreatePostForm={setShowCreatePostForm} showCreatePostForm={showCreatePostForm}/>
      }
    </div>
  );
};
