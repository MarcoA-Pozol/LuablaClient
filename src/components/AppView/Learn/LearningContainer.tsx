import { GetUserDecks } from "./GetUserDecks";

interface LearningContainerProps {
    authUser: string;
    userDecksList:any[];
    languageToStudy: string;
}

export const LearningContainer= ({authUser, userDecksList, languageToStudy}:LearningContainerProps) => {

    return (
        <>
            <GetUserDecks authUser={authUser} userDecksList={userDecksList} languageToStudy={languageToStudy}/>
        </>
    );
}