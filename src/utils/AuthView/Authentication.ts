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
            setAuthUser(response.data);
            navigate("/app");
            return;
        }

        navigate("/auth");
    } catch (error) {
        alert(`SignUp failed: ${error}`)
    }
};

export const handleSignIn = async({event, navigate, axios, setAuthUser, temporaryMessage}:handleSignInProps) => {
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
            temporaryMessage.display("Welcome back!", "green");
            setTimeout(() => {setAuthUser(response.data);navigate("/app");}, 800); 
        } else {
            temporaryMessage.display(`SignIn failed: ${response.data}`, "orangered");
        }
    } catch (error:any) {
        if (error.status === 404) {
            temporaryMessage.display("User not found.", "orangered");
        } else if (error.status === 401) {
            temporaryMessage.display("Invalid password.", "orangered");
        } else {
            temporaryMessage.display(`Unexpected error: ${error}`, "red");
        }
    }
}