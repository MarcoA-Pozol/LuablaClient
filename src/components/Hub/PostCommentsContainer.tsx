import type { PostCommentsContainerI } from "../../interfaces/Post";
import { AddPostCommentForm } from "./AddPostCommentForm";



export const PostCommentsContainer = ({post, openComments}:PostCommentsContainerI) => {
    return (
        <div className={`comments-container ${openComments[post.id] ? "open" : ""}`}>
            <div className="comments-list">
                {post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <p className="comment-user">{comment.author.username}</p>
                    <p className="comment-content">{comment.comment}</p>
                    {comment.image && <img src={`http://localhost:8600/${comment.image}`} className="comment-image" alt={comment.image}/>}
                    <p className="comment-created-at">{comment.created_at}</p>
                </div>
                ))}
            </div>

            {/* Add comment input */}
            <AddPostCommentForm post={post}/>
        </div>
    );
}