import type { ReactNode } from "react";
import "../../styles/AuthView/signUpForm.css";
import SignUpFormIMG from "../../assets/AuthView/login_image.png";
import { countriesList } from "../../datasets/AuthView";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleSignUp } from "../../utils/AuthView/Authentication";
// Icons
import { FaUser, FaEnvelope, FaLock, FaGlobeAmericas, FaCamera } from "react-icons/fa";
import { useAuth } from "../../App";

interface SignUpFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignUpForm = ({children, onClick}:SignUpFormProps) => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-image">
                    <img src={SignUpFormIMG} alt="Join Us"/>
                </div>
                <form onSubmit={(event) => handleSignUp({event, navigate, axios, setAuthUser})} className="register-form" method="POST" encType="multipart/form-data">
                    <h2>Create Your Account</h2>

                    <label style={{display:"inline-flex"}}>
                        <FaUser className="input-icon-su"/>
                        <input name="username" placeholder="Username" type="text" required/>
                    </label>

                    <label style={{display:"inline-flex"}}>
                        <FaEnvelope className="input-icon-su"/>
                        <input name="email" placeholder="Email" type="email" required/>
                    </label>

                    <label style={{display:"inline-flex"}}>
                        <FaLock className="input-icon-su"/>
                        <input name="password" placeholder="Password" type="password" required/>
                    </label>

                    <label style={{display:"inline-flex"}}>
                        <FaLock className="input-icon-su"/>
                        <input name="repeatPassword" placeholder="Repeat password" type="password" required/>
                    </label>

                    <label style={{display:"inline-flex"}}>
                        <FaGlobeAmericas className="input-icon-su"/>
                        <select name="country" required={false}>
                            <option disabled={true}>Select</option>
                            {countriesList.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label style={{display:"inline-flex"}}>
                        <FaCamera className="input-icon-su"/>
                        <input name="profilePicture" placeholder="Profile Picture" type="file" required={false}/>
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