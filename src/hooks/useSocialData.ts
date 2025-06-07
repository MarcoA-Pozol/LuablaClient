import { useContext } from "react";
import { SocialDataContext } from "../contexts/SocialDataContext";

export const useSocialData = () => {
    const context = useContext(SocialDataContext);
    if (!context) throw new Error("useSocialData must be used within a SocialDataContext provider");
    return context;
}