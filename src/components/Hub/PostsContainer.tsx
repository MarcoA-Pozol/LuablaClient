import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/HubView/PostsContainer.css";
import { CreatePostForm } from "./CreatePostForm";
import { usePosts } from "../../hooks/usePosts";
import { PostCard } from "./PostCard";
import axios from "axios";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import type { Post } from "../../schemas/Post";
import { useLanguages } from "../../hooks/useLanguages";

export const PostsContainer = () => {
  const { t } = useTranslation();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const {postsList, setPostsList} = usePosts(); 
  const [postsPage, setPostsPage] = useState<number>(2);
  const {languageToLearn} = useLanguages();

  const fetchMorePosts = async () => {
    const nextPage = postsPage + 1;
    setPostsPage(nextPage);
    const response = await axios.get(useBaseApiUrl("/hub/posts/all?page=${nextPage}"), {
      params: {language:languageToLearn, page:postsPage},
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }  
    });
    const data = response.data.items as Post[];
    if (!data || data.length === 0) {
      return;
    }

    // Append fetched posts to the existing postsList
    setPostsList(prev => [...prev, ...data]);
  }

  return (
    <div className="posts-container">
      <div >
        <button className="create-post-button" onClick={() => {setShowCreatePostForm(true)}}>Create Post +</button>
        {showCreatePostForm === true &&
          <CreatePostForm setShowCreatePostForm={setShowCreatePostForm} showCreatePostForm={showCreatePostForm}/>
        }
      </div>
      
      <div className="posts-list">
        {postsList.map((post) => (
          <PostCard post={post}/>
        ))}

        <button id="see-more-posts" onClick={() => fetchMorePosts()}>
          See more...
        </button>
      </div>

      <p className="language-footer">
        {t("Don’t forget to respect other people's opinions while commenting")}
      </p>

    </div>
  );
};
