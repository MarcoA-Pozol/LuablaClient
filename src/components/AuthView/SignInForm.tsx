import type { ReactNode } from "react";
import axios from "axios";
import SignInFormIMG from "../../assets/AuthView/register_image.png";
import { handleSignIn } from "../../utils/AuthView/Authentication";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";
// Icons
import { FaUser, FaLock } from "react-icons/fa";

interface SignInFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignInForm = ({children, onClick}:SignInFormProps) => {
    const navigate = useNavigate();
    const responsiveCssValue = useResponsiveCssValue();
    const { setAuthUser } = useAuth();

    const styles: { [key: string]: React.CSSProperties } = {
        header: {
            backgroundColor: responsiveCssValue("red", "rgb(36, 25, 97)"),
            color: "white",
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: responsiveCssValue("5px", "5px"),
            width: "100vw",
            flexWrap: "wrap",
        },
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container">
                    <div className="login-image">
                        <img src={SignInFormIMG} alt="Learn Languages"/>
                    </div>

                    <form onSubmit={(event) => handleSignIn({event, navigate, axios, setAuthUser})} style={styles.header} className="login-form" method="post">
                        <h2>SignIn to Your Account</h2>
                        <label style={{display:"inline-flex"}}>
                            <FaUser className="input-icon-si"/>
                            <input name="input" type="text" placeholder="Username | Email" required/>
                        </label>

                        <label style={{display:"inline-flex"}}>
                            <FaLock className="input-icon-si"/>
                            <input name="password" type="password" placeholder="Password" required/>
                        </label>

                        <button type="submit">Login</button>

                        <div className="extra-options">
                            <a>Forgot Password?</a>
                            <a onClick={onClick} className="register-link">
                                {children}
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}