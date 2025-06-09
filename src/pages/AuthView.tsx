import { useState } from "react";
import { SignInForm } from "../components/AuthView/SignInForm";
import { SignUpForm } from "../components/AuthView/SignUpForm";
import { TopNavBar } from "../components/LandingView/TopNavBar";

export const AuthView = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

    return (
        <>
            <TopNavBar isUserAuthenticated={isUserAuthenticated}/>
            {isUserAuthenticated ? (
                <p>Welcome to the app</p>
            ) : (
                <div>
                    <SignInForm/>
                    <SignUpForm/>
                </div>
            )}
        </>
    );
}