import type { SetStateAction } from "react";

export interface TopNavBarProps {
    authUser: string | null;
    setAuthUser: React.Dispatch<SetStateAction<string | null>>
}