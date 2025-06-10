import ApiTokenValidationAndRefreshMiddleware from "./ApiConnection";
import type { CheckIsEmailVerifiedProps } from "../types/AuthView/EmailVerification";

export const sendEmailVerificationCode = async () => {

    ApiTokenValidationAndRefreshMiddleware.post('/auth/sendEmailVerificationCode', {}, {withCredentials: true})
    .then(() => {
        
        alert("Verification code was sent to your email");
    })
    .catch((err:any) => {
        alert(`Error on send email verification code: ${err.response.data.message}`);          
    });
}


export const checkIsEmailVerified = async ({setIsEmailVerified}:CheckIsEmailVerifiedProps) => {
    try {

        ApiTokenValidationAndRefreshMiddleware.post('/auth/checkIsEmailVerified', {}, {withCredentials: true})
        .then(() => {

            setIsEmailVerified(true);
        })
        .catch(() => {
            setIsEmailVerified(false);
            return;         
        });

    } catch (err) {
        setIsEmailVerified(false);
        console.error("Error on checkIsEmailVerified: ", err);
    };
}