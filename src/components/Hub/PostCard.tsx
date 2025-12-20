import type { PostCardI } from "../../interfaces/Post";
import {FaChevronDown, FaChevronUp, FaCommentDots, FaClock,} from "react-icons/fa";
import { useState } from "react";
import { PostCommentsContainer } from "./PostCommentsContainer";


export const PostCard = ({post, post_key}:PostCardI) => {
    const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});
    
    const toggleComments = (postId: number) => {
        setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };

    return (
        <div key={post_key} className="post-card">
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

            <PostCommentsContainer post={post} openComments={openComments}/>
        </div>
    );
}