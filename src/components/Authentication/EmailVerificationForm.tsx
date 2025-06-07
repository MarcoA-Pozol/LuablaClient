import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import type { EmailVerificationFormProps } from "../../types/AuthView/EmailVerification";
import { sendEmailVerificationCode } from "../../utils/EmailVerification";
import ApiTokenValidationAndRefreshMiddleware from "../../utils/ApiConnection";


const EmailVerificationForm = ({setIsEmailVerified}:EmailVerificationFormProps) => {
    const [verificationCode, setVerificationCode] = useState<string>("");
    const verificationCodeElementRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    //Place cursor in text area just after load page
    useEffect(() => {
            if(verificationCodeElementRef.current) verificationCodeElementRef.current.focus(); 
    }, []);

    if (verificationCode === "" || !verificationCode) {
        alert("Insert a verification code");
    }


    
    const handleFormSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        ApiTokenValidationAndRefreshMiddleware.post('/auth/verifyEmail', 
            { code: verificationCode }, 
            {withCredentials: true})

        .then(() => {

            alert("Email verified successfully");
            setIsEmailVerified(true);
            <Navigate to="/" />
        })
        .catch(() => {

            alert(`Failed to verify email with this code: ${verificationCode}`);
            alert("Invalid or expired code");
            setVerificationCode("");
            return;
        });
    }

    //Re-place cursor in text area after submiting
    if (verificationCodeElementRef.current) verificationCodeElementRef.current.focus(); 

    return (
        <>
            <h2>{t("Email Verification")}</h2>
            <p>{t("Insert the code we sent to your email adress")}</p>
            <form onSubmit={handleFormSubmission}>
                <label>
                    🛡️
                    <input type="text" placeholder={t("Verification Code")} ref={verificationCodeElementRef} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}></input>
                </label>
                <button type="submit">{t("Submit")}</button>
            </form>
            <p>{t("Didn't receive the code?")} <b onClick={sendEmailVerificationCode} style={{cursor:"pointer"}}>{t("Resend code")}</b></p>
        </>
    );
}

export default EmailVerificationForm;