import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import type { handleSignInProps, handleSignUpProps } from "../../types/AuthView/AuthenticationForms";

export const handleSignUp = async ({event, navigate, axios, setAuthUser, temporaryMessage, t}:handleSignUpProps) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.currentTarget);
    const input = formData.get("username") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeatPassword") as string;

    if (password !== repeatPassword) {
        temporaryMessage.display(t("Passwords must coincide"), "orangered");
        return;
    }

    try {
        const response = await axios.post(useBaseApiUrl("/auth/signUp"), 
            formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const data = response.data;

        if (response.status !== 201) {
            if (response.status === 400) {
                temporaryMessage.display(t("Username in existance"), "orangered");
            } else {
                temporaryMessage.display(t("Server error")+":"+data.error, "red");
            }
        }

        // SignIn after SignUp
        const signInResponse = await axios.post(useBaseApiUrl("/auth/signIn"), {
            input,
            password
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }); 
        
        if (signInResponse.status === 200) {
            temporaryMessage.display(t("Register was successfull!"), "royalblue");
            setAuthUser(response.data);
            navigate("/app");
            return;
        } 

        navigate("/auth");
    } catch (error) {
        temporaryMessage.display(t("This username is in use"), "orangered");
    }
};

export const handleSignIn = async({event, navigate, axios, setAuthUser, temporaryMessage, t}:handleSignInProps) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.currentTarget);
    const input = formData.get("input") as string;
    const password = formData.get("password") as string;

    
    try {
        const response = await axios.post(useBaseApiUrl("/auth/signIn"), {
            input,
            password
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }); 

        if (response.status === 200) {
            temporaryMessage.display(t("Welcome back"), "green");
            setTimeout(() => {setAuthUser(response.data);navigate("/app");}, 800); 
        } 
    } catch (error:any) {
        if (error.status === 404) {
            temporaryMessage.display(t("User not found"), "orangered");
        } else if (error.status === 401 && error.data.error === "Invalid password") {
            temporaryMessage.display(t("Invalid password"), "orangered");
        } else if (error.status === 401 && error.data.erro !== "Invalid password") { 
            temporaryMessage.display(t("Cookies for authentication are expired", "red"))
        } else {
            temporaryMessage.display(t("Server is not available"), "red");
        }
    }
}