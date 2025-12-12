export type PostAuthor = {
    id: number;
    username: string;
    profilePicture: any;
}

export type CommentAuthor = {
    id: number;
    username: string;
    profilePicture: string;
}

export type PostComment = {
    id: number;
    author: CommentAuthor;
    opinion: string;
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