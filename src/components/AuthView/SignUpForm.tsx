import type { ReactNode } from "react";
import "../../styles/AuthView/signUpForm.css";
import SignUpFormIMG from "../../assets/AuthView/register_image.png";

interface SignUpFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignUpForm = ({children, onClick}:SignUpFormProps) => {
    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-image">
                    <img src={SignUpFormIMG} alt="Join Us"/>
                </div>
                <form className="register-form" method="post">
                    <h2>Create Your Account</h2>

                    <label>
                            Username
                            <input type="text"/>
                    </label>

                    <label>
                            Email
                            <input type="email"/>
                    </label>

                    <label>
                            Password
                            <input type="password"/>
                    </label>

                    <label>
                            Country
                            <input type="text"/>
                    </label>

                    <label>
                            Profile Picture
                            <input type="text"/>
                    </label>

                    <button type="submit">Register</button>

                    <div className="extra-options">
                        <a onClick={onClick}>
                            {children}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}