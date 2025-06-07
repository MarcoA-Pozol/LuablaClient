import type { PostCardI } from "../../interfaces/Post";
import {FaChevronDown, FaChevronUp, FaCommentDots, FaClock,} from "react-icons/fa";
import { useState } from "react";
import { PostCommentsContainer } from "./PostCommentsContainer";
import { timeAgo } from "../../functions/timeAgo";


export const PostCard = ({post}:PostCardI) => {
    const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});
    
    const toggleComments = (postId: number) => {
        setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };

    return (
        <div className="post-card">
            <p className="author-label">
                <div className="post-author">
                    <img src={`http://localhost:8600/${post.author.profile_picture}`} alt={post.author.profile_picture}/>  
                    <p className="author-name">{post.author.username}</p>
                </div>
                <h2 style={{color:"#555"}}> • </h2>
                <div className="datetime-label">
                    <FaClock/> 
                    {timeAgo(post.created_at)}
                </div>
                <span className="post-id">{post.id}</span>
            </p>
            <hr id="short-hr"></hr>

            <h2 className="post-topic">{post.title}</h2>

            <div className="post-answer">
                <p>{post.opinion}</p>
            </div>

            {post.speech && <audio controls src={`http://localhost:8600/${post.speech}`}/>}

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