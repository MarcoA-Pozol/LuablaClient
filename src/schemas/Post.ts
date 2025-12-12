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