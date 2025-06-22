import { useState } from "react";
import { SignInForm } from "../components/AuthView/SignInForm";
import { SignUpForm } from "../components/AuthView/SignUpForm";
import { TopNavBar } from "../components/LandingView/TopNavBar";
import { useLocation } from "react-router-dom";

export const AuthView = () => {
    const location = useLocation();
    const showLoginState = location.state as {isLoginVisible?:boolean};
    const [isLoginVisible, setIsLoginVisible] = useState<boolean>(showLoginState?.isLoginVisible ?? false); // Display SignUp form first

    const toggleSignInUpForms = () => {
        setIsLoginVisible((prev) => !prev);
    }

    return (
        <>
            <TopNavBar/>
            {isLoginVisible ? (
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