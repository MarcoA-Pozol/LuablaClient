import { useEffect, useState } from "react";
import { useAuth } from "../../App";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authUser } = useAuth();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsCheckingAuth(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    return authUser ? <>{children}</> : <Navigate to="/auth" replace />;
};