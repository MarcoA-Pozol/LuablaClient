import type { handleSignInProps, handleSignUpProps } from "../../types/AuthView/AuthenticationForms";

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

        const data = response.data;

        if (response.status !== 201) {
            console.error(`SignUp failed: ${data.error}`);
            alert(`SignUp failed: ${data.error}`);
        }

        console.log(`SignUp was successfull: ${data.message}`);
        navigate("/app");
    } catch (error) {
        console.error(`SignUp failed: ${error}`)
        alert(`SignUp failed: ${error}`)
    }
};

export const handleSignIn = async({event, navigate, axios, authUser, setAuthUser}:handleSignInProps) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.currentTarget);
    const input = formData.get("input") as string;
    const password = formData.get("password") as string;

    try {
        const response = await axios.post("http://localhost:8600/api/auth/signIn", {
            input,
            password
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }); 
        
        if (response.status === 200) {
            const { username } = response.data;
            setAuthUser(username);
            navigate("/app");
            return;
        }
        
        alert(`SignIn failed: ${response.data}`);
    } catch (error) {
        alert(`SignIn failed: ${error}`);
    }
}