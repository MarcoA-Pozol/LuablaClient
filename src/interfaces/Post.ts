import type { Post } from "../schemas/Post";

export interface PostCardI {
    post:Post;
    post_key:number;
}

export interface PostCommentsContainerI {
    post: Post;
    openComments: any;
}