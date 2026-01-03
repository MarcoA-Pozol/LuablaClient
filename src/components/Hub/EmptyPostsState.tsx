import React, { type SetStateAction } from 'react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import '../../styles/HubView/EmptyPostsState.css';
import { useTranslation } from 'react-i18next';

interface EmptyPostsStateI {
    setShowCreatePostForm: React.Dispatch<SetStateAction<boolean>>;
}

export const EmptyPostsState = ({setShowCreatePostForm}:EmptyPostsStateI) => {
    const {t} = useTranslation();

    return (
    <div className="empty-container">
      <div className="icon-wrapper">
        <ChatBubbleLeftEllipsisIcon className="floating-icon" />
      </div>

      <h3 className="empty-title">{t("The wall is quiet...")}</h3>
      <p className="empty-description">
        {t("Be the first to spark a conversation. Share your thoughts with the community!")}
      </p>
      
      <button className="create-post-button" onClick={() => {setShowCreatePostForm(true)}}>{t("Create Post")} +</button>
    </div>
  );
};