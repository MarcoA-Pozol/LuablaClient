export type Deck = {
    id: number;
    index:string|number;
    title:string;
    description:string;
    image:string;
    author:string;
    level:string;
    cardsQuantity:string|number;
    language:string;
    [key: string]: any;
};