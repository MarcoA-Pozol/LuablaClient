import type { AxiosInstance } from "axios";
import type { NavigateFunction } from "react-router-dom";

export interface handleSignUpProps {
    event: React.FormEvent<HTMLFormElement>;
    navigate: NavigateFunction;
    axios: AxiosInstance;
}

export interface handleSignInProps {
    event: React.FormEvent<HTMLFormElement>;
    navigate: NavigateFunction;
    axios: AxiosInstance;
}