import { useTranslation } from "react-i18next";
// import { handleObjectCreation } from "../../functions/handleObjectCreation";
// import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { createNotification } from "../../functions/createNotification";
import { useAuth } from "../../App";
import type { Post, PostComment } from "../../schemas/Post";
import { handleObjectCreation } from "../../functions/handleObjectCreation";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { usePosts } from "../../hooks/usePosts";
import { useSocialData } from "../../hooks/useSocialData";

interface AddPostCommentFormI {
    post:Post;
}

export const AddPostCommentForm = ({post}:AddPostCommentFormI) => {
    const { t } = useTranslation();
    const {authUser} = useAuth();
    const { setPostsList } = usePosts(); 
    const { fetchNotifications } = useSocialData();
    

const handlePostCommentCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Form & its data
    const form = event.currentTarget;

    // Send POST request
    try {
        const responseData = await handleObjectCreation(
            event,
            useBaseApiUrl("/hub/postComment"),
            {},
            { "Content-Type": "multipart/form-data" },
            "post comment"
        );

        const newComment = responseData.item as PostComment;
        
        // Add new comment to the existing list of comments
        // Use 'p' or 'currentPost' to avoid shadowing the outer 'post' prop
        setPostsList(prevPosts => 
            prevPosts.map(p => 
                p.id === post.id  // Now this correctly refers to the component's 'post' prop
                    ? { 
                        ...p, 
                        comments: [...p.comments, newComment] 
                    }
                    : p
            )
        );

        // Notify post's comment author & post's author
        // For the auth user (person who commented)
        await createNotification(
        `Comment added to "${post.title}"`,
        `You commented on ${post.author.username}'s post.`,
        "POST_COMMENT"
        );

        // For the post author
        await createNotification(
        `New comment on your post`,
        `${authUser?.username ?? 'Someone'} commented on your post "${post.title}": "${newComment.comment.toString().slice(0, 100)}${newComment.comment.toString().length > 100 ? '...' : ''}"`,
        "POST_COMMENT"
        );
        fetchNotifications();
        
        // Clear the form
        form.reset();
        
    } catch (error) {
        console.error('Network error:', error);
    }
}

    return (
        <form onSubmit={handlePostCommentCreation} className="add-comment" method="POST" encType="multipart/form-data" onClick={(e) => e.stopPropagation()}>
            <textarea placeholder={t("Write your comment here...")} className="comment-textarea" name="comment"/>

            <input type="hidden" name="post_id" value={post.id} />

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