import type { ReactNode } from "react";
import "../../styles/AuthView/signUpForm.css";
import SignUpFormIMG from "../../assets/AuthView/login_image.png";
import { countriesList } from "../../utils/CountriesList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Icons
import { FaUser, FaEnvelope, FaLock, FaGlobeAmericas, FaCamera } from "react-icons/fa";

interface SignUpFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignUpForm = ({children, onClick}:SignUpFormProps) => {
    const navigate = useNavigate();
    
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const repeatPassword = formData.get("repeatPassword") as string;
        const country = formData.get("country") as string;
        const profilePicture = formData.get("profilePicture") as File;

        if (password !== repeatPassword) {
            alert("Passwords must coincide");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8600/auth/signUp", {
                username,
                email, 
                password,
                country,
                profilePicture
            });

            if (response.status !== 201) {
                alert(`SignUp failed: ${response.data}`);
            }

            console.log("SignUp was successfull");
            navigate("/app");
        } catch (error) {
            alert(`SignUp failed: ${error}`)
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-image">
                    <img src={SignUpFormIMG} alt="Join Us"/>
                </div>
                <form onSubmit={handleSignUp} className="register-form" method="post">
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