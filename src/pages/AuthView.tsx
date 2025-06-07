import { useState } from "react";
import { SignInForm } from "../components/Authentication/SignInForm";
import { SignUpForm } from "../components/Authentication/SignUpForm";
import { TopNavBar } from "../components/Landing/TopNavBar";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../App";
import { useTranslation } from "react-i18next";

export const AuthView = () => {
    const location = useLocation();
    const showLoginState = location.state as {isLoginVisible?:boolean};
    const [isLoginVisible, setIsLoginVisible] = useState<boolean>(showLoginState?.isLoginVisible ?? false); // Display SignUp form first
    const { authUser, setAuthUser } = useAuth();
    const { t } = useTranslation();

    const toggleSignInUpForms = () => {
        setIsLoginVisible((prev) => !prev);
    }

    return (
        <>
            {authUser ? (
                <Navigate to={"/modules"}/>
            ):(
                <>
                    <TopNavBar authUser={authUser} setAuthUser={setAuthUser} />
                    {isLoginVisible ? (
                        <SignInForm onClick={toggleSignInUpForms}>
                            <span className='toggle-forms-button'>{t("I do not have an account yet")}</span>
                        </SignInForm>
                    ) : (
                        <SignUpForm onClick={toggleSignInUpForms}>
                            <span className='toggle-forms-button'>{t("I already have an account")}</span>
                        </SignUpForm>
                    )}
                </>
            )}
        </>
    );
}