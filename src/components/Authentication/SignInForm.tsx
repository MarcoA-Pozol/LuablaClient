import type { ReactNode } from "react";
import axios from "axios";
import SignInFormIMG from "../../assets/AuthView/register_image.png";
import { handleSignIn } from "../../utils/AuthView/Authentication";
import { TemporaryMessage } from "../General/TemporaryMessage";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { useTemporaryMessage } from "../../hooks/useTemporaryMessage";
import { useSignInFormStyles } from "../../styles/AuthView/signInForm";
import { useTranslation } from "react-i18next";

interface SignInFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignInForm = ({children, onClick}:SignInFormProps) => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();
    const styles = useSignInFormStyles();
    const temporaryMessage = useTemporaryMessage(); 
    const { t } = useTranslation();

    return (
        <>
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.imageContainer}>
                        <img src={SignInFormIMG} alt="Learn Languages" style={styles.image}/>
                    </div>

                    <form onSubmit={(event) => handleSignIn({event, navigate, axios, setAuthUser, temporaryMessage, t})} style={styles.form} method="post">
                        <h2 style={styles.formTitle}>{t("Sign In")}</h2>
                        <label style={styles.formLabel}>
                            <FaUser style={styles.inputIcon}/>
                            <input name="input" type="text" placeholder={t("Username | Email")} required style={styles.formInput}/>
                        </label>

                        <label style={styles.formLabel}>
                            <FaLock style={styles.inputIcon}/>
                            <input name="password" type="password" placeholder={t("Password")} required style={styles.formInput}/>
                        </label>

                        <button style={styles.formButton} type="submit">{t("Submit")}</button>

                        <div style={styles.linkOptions}>
                            <a style={styles.extraLink}>{t("Forgot Password")}</a>
                            <a onClick={onClick} style={styles.extraLink}>
                                {children}
                            </a>
                        </div>
                    </form>

                </div>
            </div>

            {temporaryMessage.show && <TemporaryMessage message={temporaryMessage.text} color={temporaryMessage.color}/>}
        </>
    );
}