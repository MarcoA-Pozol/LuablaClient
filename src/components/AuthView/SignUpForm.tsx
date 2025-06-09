import type { ReactNode } from "react";

interface SignUpFormProps {
    children?: ReactNode; 
    onClick: () => void; 
}

export const SignUpForm = ({children, onClick}:SignUpFormProps) => {
    return (
        <p>
            SignUp form
            <div onClick={onClick}>
                {children}
            </div>
        </p>
    );
}