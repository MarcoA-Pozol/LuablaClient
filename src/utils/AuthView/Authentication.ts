import type { AxiosInstance } from "axios";
import type { NavigateFunction } from "react-router-dom";

interface handleSignUpProps {
    event: React.FormEvent<HTMLFormElement>;
    navigate: NavigateFunction;
    axios: AxiosInstance;
}

export const handleSignUp = async ({event, navigate, axios}:handleSignUpProps) => {
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
        const response = await axios.post("http://localhost:8600/api/auth/signUp", {
            username,
            email, 
            password,
            country,
            profilePicture
        });

        if (response.status !== 201) {
            console.error(`SignUp failed: ${response.data}`);
            alert(`SignUp failed: ${response.data}`);
        }

        console.log("SignUp was successfull");
        navigate("/app");
    } catch (error) {
        console.error(`SignUp failed: ${error}`)
        alert(`SignUp failed: ${error}`)
    }
};