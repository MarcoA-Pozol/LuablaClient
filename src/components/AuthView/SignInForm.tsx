import type { ReactNode } from "react";
import axios from "axios";
import "../../styles/AuthView/signInForm.css";
import SignInFormIMG from "../../assets/AuthView/login_image.png";
import type React from "react";
import { useNavigate } from "react-router-dom";

interface SignInFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignInForm = ({children, onClick}:SignInFormProps) => {
    const navigate = useNavigate();

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const input = formData.get("input") as string;
        const password = formData.get("password") as string;

        try {
            const response = await axios.post("http://localhost:8600/auth/signIn", {
                input,
                password
            }); // ,{ withCredentials: true }); if server uses cookies
            
            if (response.status !== 200) {
                alert(`Login failed: ${response.data}`);
            }

            console.log("Login was successfull");
            navigate("/app");
        } catch (error) {
            alert(`Login failed: ${error}`);
        }
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container">
                    <div className="login-image">
                        <img src={SignInFormIMG} alt="Learn Languages"/>
                    </div>

                    <form onSubmit={handleSignIn} className="login-form" method="post">
                        <h2>SignIn to Your Account</h2>
                        <label>
                            Username | Email
                            <input name="input" type="text" placeholder="Username | Email" required/>
                        </label>

                        <label>
                            Password
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