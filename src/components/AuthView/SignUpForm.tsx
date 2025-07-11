import type { ReactNode } from "react";
import SignUpFormIMG from "../../assets/AuthView/login_image.png";
import { countriesList } from "../../datasets/AuthView";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleSignUp } from "../../utils/AuthView/Authentication";
import { FaUser, FaEnvelope, FaLock, FaGlobeAmericas, FaCamera } from "react-icons/fa";
import { useAuth } from "../../App";
import { useSignUpFormStyles } from "../../styles/AuthView/signUpForm";

interface SignUpFormProps {
    children?: ReactNode;
    onClick: () => void;
}

export const SignUpForm = ({ children, onClick }: SignUpFormProps) => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();
    const styles = useSignUpFormStyles();

    return (
        <div style={styles.page}>
        <div style={styles.container}>
            <div style={styles.imageContainer}>
            <img src={SignUpFormIMG} alt="Join Us" style={styles.image} />
            </div>
            <form
            onSubmit={(event) => handleSignUp({ event, navigate, axios, setAuthUser })}
            method="POST"
            encType="multipart/form-data"
            style={styles.form}
            >
            <h2 style={styles.title}>Create Your Account</h2>

            <label style={styles.label}>
                <FaUser style={styles.icon} />
                <input name="username" type="text" placeholder="Username" required style={styles.input} />
            </label>

            <label style={styles.label}>
                <FaEnvelope style={styles.icon} />
                <input name="email" type="email" placeholder="Email" required style={styles.input} />
            </label>

            <label style={styles.label}>
                <FaLock style={styles.icon} />
                <input name="password" type="password" placeholder="Password" required style={styles.input} />
            </label>

            <label style={styles.label}>
                <FaLock style={styles.icon} />
                <input name="repeatPassword" type="password" placeholder="Repeat Password" required style={styles.input} />
            </label>

            <label style={styles.label}>
                <FaGlobeAmericas style={styles.icon} />
                <select name="country" required={false} style={styles.select}>
                <option disabled selected>
                    Select
                </option>
                {countriesList.map((country, index) => (
                    <option key={index} value={country}>
                    {country}
                    </option>
                ))}
                </select>
            </label>

            <label style={styles.label}>
                <FaCamera style={styles.icon} />
                <input name="profilePicture" type="file" required={false} style={styles.fileInput} />
            </label>

            <button type="submit" style={styles.button}>
                Register
            </button>

            <div style={styles.extraOptions}>
                <a onClick={onClick} style={styles.link}>
                {children}
                </a>
            </div>
            </form>
        </div>
        </div>
    );
};
