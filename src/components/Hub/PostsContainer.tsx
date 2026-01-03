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
import { EmptyPostsState } from "./EmptyPostsState";

export const PostsContainer = () => {
  const { t } = useTranslation();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const {postsList, setPostsList, postsPaginationMessage, setPostsPaginationMessage, postsPage, setPostsPage} = usePosts(); 
  const {languageToLearn} = useLanguages();
  const page = postsPage + 1;

  const fetchMorePosts = async () => {
    const response = await axios.get(useBaseApiUrl(`/hub/posts/all?page=${page}`), {
      params: {language:languageToLearn, page:page},
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
    setPostsPaginationMessage(response.data.pagination.has_next);
    setPostsPage(response.data.pagination.current_page);
  }

  return (
    <div className="posts-container">
      {showCreatePostForm === true &&
        <CreatePostForm setShowCreatePostForm={setShowCreatePostForm} showCreatePostForm={showCreatePostForm}/>
      }
      
      {postsList.length < 1 ? 
          <EmptyPostsState setShowCreatePostForm={setShowCreatePostForm}/>
        : 
          <>
            <button className="create-post-button" onClick={() => {setShowCreatePostForm(true)}}>Create Post +</button>
            {postsList.map((post) => <PostCard post={post}/>)}
            {postsPaginationMessage == true ? <button id="see-more-posts" onClick={() => fetchMorePosts()}>{t("See more...")}</button> : <p>There are no more pages</p>}
          </>
      }

    </div>
  );
};
