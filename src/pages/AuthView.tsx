import { useState } from "react";
import { SignInForm } from "../components/AuthView/SignInForm";
import { SignUpForm } from "../components/AuthView/SignUpForm";
import { TopNavBar } from "../components/LandingView/TopNavBar";

export const AuthView = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
    const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false); // Display SignUp form first

    const toggleSignInUpForms = () => {
        setIsLoginVisible((prev) => !prev);
    }

    return (
        <>
            <TopNavBar isUserAuthenticated={isUserAuthenticated}/>
            {isUserAuthenticated ? (
                <p>Welcome to the app</p>
            ) : isLoginVisible ? (
                <SignInForm onClick={toggleSignInUpForms}>
                    <span className='toggle-forms-button'>I do not have an account yet</span>
                </SignInForm>
            ) : (
                <SignUpForm onClick={toggleSignInUpForms}>
                    <span className='toggle-forms-button'>I already have an account</span>
                </SignUpForm>
            )}
        </>
    );
}