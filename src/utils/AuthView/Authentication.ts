import type { handleSignInProps, handleSignUpProps } from "../../types/AuthView/AuthenticationForms";

export const handleSignUp = async ({event, navigate, axios, setAuthUser}:handleSignUpProps) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.currentTarget);
    const input = formData.get("username") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeatPassword") as string;

    if (password !== repeatPassword) {
        alert("Passwords must coincide");
        return;
    }

    try {
        const response = await axios.post("http://localhost:8600/api/auth/signUp", 
            formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const data = response.data;

        if (response.status !== 201) {
            console.error(`SignUp failed: ${data.error}`);
            alert(`SignUp failed: ${data.error}`);
        }

        // SignIn after SignUp
        const signInResponse = await axios.post("http://localhost:8600/api/auth/signIn", {
            input,
            password
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }); 
        
        if (signInResponse.status === 200) {
            setAuthUser(input);
            navigate("/app");
            return;
        }

        navigate("/auth");
    } catch (error) {
        alert(`SignUp failed: ${error}`)
    }
};

export const handleSignIn = async({event, navigate, axios, setAuthUser}:handleSignInProps) => {
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