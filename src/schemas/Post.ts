export type PostAuthor = {
    id: number;
    username: string;
    profile_picture: any;
}

export type CommentAuthor = {
    id: number;
    username: string;
    profile_picture: string;
}

export type PostComment = {
    id: number;
    author: CommentAuthor;
    comment: string;
    speech: any;
    image: any;
    created_at: any;
}

export type Post = {
    id: number;
    author: PostAuthor;
    title: string;
    opinion: string;
    speech: any;
    image: any;
    created_at: string;
    comments: PostComment[];
}