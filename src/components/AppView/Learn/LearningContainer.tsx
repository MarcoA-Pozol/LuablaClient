import { DecksToStudyContainer } from "./GetUserDecks";

interface LearningContainerProps {
    authUser: string;
    userDecksList:any[];
    ownedDecksList:any[];
    languageToStudy: string;
}

export const LearningContainer= ({authUser, userDecksList, ownedDecksList, languageToStudy}:LearningContainerProps) => {

    return (
        <>
            <DecksToStudyContainer authUser={authUser} userDecksList={userDecksList} ownedDecksList={ownedDecksList} languageToStudy={languageToStudy}/>
        </>
    );
}