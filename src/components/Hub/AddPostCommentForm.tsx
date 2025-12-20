import { useTranslation } from "react-i18next";
import { handleObjectCreation } from "../../functions/handleObjectCreation";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { createNotification } from "../../functions/createNotification";
import { useAuth } from "../../App";
import type { Post } from "../../schemas/Post";

interface AddPostCommentFormI {
    post:Post;
}

export const AddPostCommentForm = ({post}:AddPostCommentFormI) => {
    const { t } = useTranslation();
    const {authUser} = useAuth();

    const handlePostCommentCreation = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Form & its data
        const form = event.currentTarget;
        const data = new FormData(form);
        
        // Submit form and its data to the API [POST]
        handleObjectCreation(event, useBaseApiUrl("/hub/postComment"), {}, {"Content-Type":"multipart/form-data"}, "post comment");
    
        // Notify post's comment author & post's author
        await createNotification(post.title, "You commented on an user post.", "POST_COMMENT");
        await createNotification(post.title, `${authUser.name} commented on your post: ${data.get("opinion")})`, "POST COMMENT");
    }

    return (
        <form onSubmit={handlePostCommentCreation} className="add-comment" method="POST" encType="multipart/form-data" onClick={(e) => e.stopPropagation()}>
            <textarea placeholder={t("Write your comment here...")} className="comment-textarea" name="opinion"/>
            
            <label className="field">
                <span>{t("Image (Optional)")}</span>
                <input type="file" name="image" accept="image/*"></input>
            </label>

            <button className="comment-button">
            {t("Submit")}
            </button>
        </form>
    );
}