export type Flashcard = {
    id:number;
    word?:string;
    hanzi?:string;
    pinyin?:string;
    kanji?:string;
    kana?:string;
    hangul?:string;
    romaji?:string;
    cyrillic?:string;
    transliteration?:string;
    meaning:string;
    example_phrase:string;
    author:number;
    deck:number;
    creation_date?:string;
}