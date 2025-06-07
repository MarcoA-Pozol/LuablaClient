import PandaLogoIMG from "../../assets/LandingView/panda-logo-1.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { InterfaceLanguageSelectionForm } from "../Profile/InterfaceLanguageSelectionForm";
import { useTranslation } from "react-i18next";
// Icons
import { BiLogOut } from "react-icons/bi";
import type { TopNavBarProps } from "../../types/LandingView/TopNavBar";
import { useEffect, useState } from "react";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";

export const TopNavBar = ({authUser, setAuthUser}:TopNavBarProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const responsiveValue = function<T>(smallScreenValue: T, largeScreenValue: T, screenWidth: number): T {
        return screenWidth < 768 ? smallScreenValue : largeScreenValue;
    };


    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const logoutUser = async () => {
        try {
            await axios.post(useBaseApiUrl("/auth/signOut"), {}, {
                withCredentials:true
            });
            setAuthUser(null);
            navigate('/');
        } catch (error) {
            alert(`Error when trying to close session: ${error}`);
        }
    };

     const styles: { [key: string]: React.CSSProperties } = {
        header: {
            backgroundColor: "rgb(36, 25, 97)",
            color: "white",
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: responsiveValue("5px", "5px", screenWidth),
            width: "100vw",
            flexWrap: "wrap",
        },
        logoLink: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: responsiveValue("center", "left", screenWidth),
            textDecoration: "none",
            color: "white",
            cursor: "pointer",
            width: responsiveValue("30vw", "50vw", screenWidth),
        },
        logoImage: {
            width: "45px",
            height: "40px",
            marginLeft: "20px",
        },
        logoText: {
            margin: 0,
            fontSize: responsiveValue("1.5rem", "2rem", screenWidth),
        },
        signUpOptions: {
            display: "inline-flex",
            gap: "10px",
            paddingInline: "5px",
            justifyContent: "center",
            width: responsiveValue("60vw", "45vw", screenWidth),
        },
        linkBase: {
            paddingInline: "20px",
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            fontSize: "1.2rem",
            borderRadius: "15px",
            textAlign: "center",
            whiteSpace: "nowrap",
            textDecoration: "none",
            color: "white",
            cursor: "pointer",
            border: "2px solid rgb(179, 179, 179)",
        },
        signUp: {
            backgroundColor: "rgb(21, 78, 202)",
        },
        signIn: {
            backgroundColor: "rgb(77, 57, 151)",
        },
        logoutIcon: {
            color: "red",
            fontSize: "2.2rem",
            cursor: "pointer",
        },
    };


    return (
        <header style={styles.header}>
            <div onClick={() => navigate('/')} style={styles.logoLink}>
                <img src={PandaLogoIMG} alt="Panda Logo" style={styles.logoImage} />
                <h2 style={styles.logoText}>Luabla</h2>
            </div>


            <div style={styles.signUpOptions}>
                <InterfaceLanguageSelectionForm/>
                {authUser ? (
                    <>
                        <div style={{ ...styles.linkBase, backgroundColor: "transparent", border: "none" }}>
                            {authUser.username}
                        </div>
                        <BiLogOut onClick={logoutUser} style={styles.logoutIcon} />
                    </>
                ) : (
                    <>
                        <div
                            onClick={() => navigate('/auth', { state: { isLoginVisible: false } })}
                            style={{ ...styles.linkBase, ...styles.signUp }}
                        >
                            {t("Sign-Up")}
                        </div>
                        <div
                            onClick={() => navigate('/auth', { state: { isLoginVisible: true } })}
                            style={{ ...styles.linkBase, ...styles.signIn }}
                        >
                            {t("Sign-In")}
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}