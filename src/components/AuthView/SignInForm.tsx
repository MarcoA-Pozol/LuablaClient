import type { ReactNode } from "react";

interface SignInFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignInForm = ({children, onClick}:SignInFormProps) => {
    return (
        <p>
            SignIn form
            <div onClick={onClick}>
                {children}
            </div>
        </p>
    );
}