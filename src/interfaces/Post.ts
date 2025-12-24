import type { Post } from "../schemas/Post";

export interface PostCardI {
    post:Post;
}

export interface PostCommentsContainerI {
    post: Post;
    openComments: any;
}