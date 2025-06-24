import type { SetStateAction } from "react";

export interface TopNavBarProps {
    authUser: any | null;
    setAuthUser: React.Dispatch<SetStateAction<any | null>>
}