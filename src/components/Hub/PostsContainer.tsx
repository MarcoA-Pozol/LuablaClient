import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaChevronDown,
  FaChevronUp,
  FaUserCircle,
  FaCommentDots,
  FaClock,
} from "react-icons/fa";
import "../../styles/HubView/PostsContainer.css";
import { CreatePostForm } from "./CreatePostForm";

export const PostsContainer = () => {
  const { t } = useTranslation();

  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  // Need to fetch post from server
  const posts = [
    {
      id: 1,
      topic: "Is it better to learn vocabulary through reading or through flashcards?",
      author: {
        name: "Maria González",
        avatar: <FaUserCircle className="post-avatar" />,
      },
      answer:
        "Personally, I think reading helps me remember words in context, which makes them easier to recall later. Flashcards are great for review, but reading gives life to the language.",
      date: "2025-10-18, 14:06",
      comments: [
        {
          id: 1,
          user: "John Tan",
          content:
            "I totally agree! I find that when I see words in context, I actually remember their usage better.",
        },
        {
          id: 2,
          user: "Sophie Laurent",
          content:
            "I prefer flashcards for quick learning, but I switch to reading once I have a decent vocabulary base.",
        },
      ],
    },
    {
      id: 2,
      topic: "Do you think listening or speaking is more important when learning a new language?",
      author: {
        name: "Darius Flint",
        avatar: <FaUserCircle className="post-avatar" />,
      },
      answer:
        "Speaking forces me to actively use what I’ve learned, but listening helps me adapt to natural rhythm and pronunciation. I’d say both should evolve together.",
      date: "2025-10-18, 14:09",
      comments: [
        {
          id: 3,
          user: "James Cobbalt",
          content:
            "I totally agree! Listening first helps me pick up patterns before I try to speak.",
        },
        {
          id: 4,
          user: "Erik Garland",
          content:
            "I focus more on speaking because I learn faster when I make mistakes out loud!",
        },
      ],
    },
  ];

  // Comments' visibility
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleComments = (postId: number) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <p className="author-label">
            <FaClock /> {post.date}
          </p>

          <h2 className="post-topic">{post.topic}</h2>

          <div className="post-author">
            {post.author.avatar}
            <div>
              <p className="author-name">{post.author.name}</p>
              <p className="author-label">Author</p>
            </div>
          </div>

          <div className="post-answer">
            <p>{post.answer}</p>
          </div>

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
                  <p className="comment-user">{comment.user}</p>
                  <p className="comment-content">{comment.content}</p>
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
        <CreatePostForm setShowCreatePostForm={setShowCreatePostForm}/>
      }
    </div>
  );
};
