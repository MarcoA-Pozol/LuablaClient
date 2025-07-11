import type { ReactNode } from "react";
import axios from "axios";
import SignInFormIMG from "../../assets/AuthView/register_image.png";
import { handleSignIn } from "../../utils/AuthView/Authentication";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
// Icons
import { FaUser, FaLock } from "react-icons/fa";
// Style
import { useSignInFormStyles } from "../../styles/AuthView/signInForm";

interface SignInFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignInForm = ({children, onClick}:SignInFormProps) => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();
    const styles = useSignInFormStyles();

    return (
        <>
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.imageContainer}>
                        <img src={SignInFormIMG} alt="Learn Languages" style={styles.image}/>
                    </div>

                    <form onSubmit={(event) => handleSignIn({event, navigate, axios, setAuthUser})} style={styles.form} method="post">
                        <h2 style={styles.formTitle}>SignIn to Your Account</h2>
                        <label style={styles.formLabel}>
                            <FaUser style={styles.inputIcon}/>
                            <input name="input" type="text" placeholder="Username | Email" required style={styles.formInput}/>
                        </label>

                        <label style={styles.formLabel}>
                            <FaLock style={styles.inputIcon}/>
                            <input name="password" type="password" placeholder="Password" required style={styles.formInput}/>
                        </label>

                        <button style={styles.formButton} type="submit">Login</button>

                        <div style={styles.linkOptions}>
                            <a style={styles.extraLink}>Forgot Password?</a>
                            <a onClick={onClick} style={styles.extraLink}>
                                {children}
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}