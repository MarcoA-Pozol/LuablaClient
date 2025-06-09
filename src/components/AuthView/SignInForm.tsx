import type { ReactNode } from "react";
import "../../styles/AuthView/signInForm.css";
import SignInFormIMG from "../../assets/AuthView/login_image.png";

interface SignInFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignInForm = ({children, onClick}:SignInFormProps) => {
    return (
        <>
            <div className="login-page">
                <div className="login-container">
                    <div className="login-image">
                        <img src={SignInFormIMG} alt="Learn Languages"/>
                    </div>
                    <form className="login-form" method="post">
                        <h2>SignIn to Your Account</h2>
                        <label>
                            Username
                            <input type="text"/>
                        </label>

                        <label>
                            Password
                            <input type="password"/>
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