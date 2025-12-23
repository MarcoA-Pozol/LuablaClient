import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/HubView/PostsContainer.css";
import { CreatePostForm } from "./CreatePostForm";
import { usePosts } from "../../hooks/usePosts";
import { PostCard } from "./PostCard";

export const PostsContainer = () => {
  const { t } = useTranslation();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const {postsList} = usePosts(); 

  return (
    <div className="posts-container">
      <div className="create-post-button">
        <button onClick={() => {setShowCreatePostForm(true)}}>Create Post +</button>
        {showCreatePostForm === true &&
          <CreatePostForm setShowCreatePostForm={setShowCreatePostForm} showCreatePostForm={showCreatePostForm}/>
        }
      </div>
      
      <div className="posts-list">
        {postsList.map((post) => (
          <PostCard post={post} post_key={post.id}/>
        ))}

      </div>

      <p className="language-footer">
        {t("Don’t forget to respect other people's opinions while commenting")}
      </p>

    </div>
  );
};
