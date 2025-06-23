import { useState } from "react";
import { SignInForm } from "../components/AuthView/SignInForm";
import { SignUpForm } from "../components/AuthView/SignUpForm";
import { TopNavBar } from "../components/LandingView/TopNavBar";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../App";

export const AuthView = () => {
    const location = useLocation();
    const showLoginState = location.state as {isLoginVisible?:boolean};
    const [isLoginVisible, setIsLoginVisible] = useState<boolean>(showLoginState?.isLoginVisible ?? false); // Display SignUp form first
    const { authUser, setAuthUser } = useAuth();

    const toggleSignInUpForms = () => {
        setIsLoginVisible((prev) => !prev);
    }

    return (
        <>
            {authUser ? (
                <Navigate to={"/app"}/>
            ):(
                <>
                    <TopNavBar authUser={authUser} setAuthUser={setAuthUser} />
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
            )}
        </>
    );
}