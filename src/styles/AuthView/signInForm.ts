import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";

export const useSignInFormStyles = (): { [key: string]: React.CSSProperties } => {
    const responsiveCssValue = useResponsiveCssValue();
    
    return {
        loginPage: {
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh"
        },
        loginContainer: {
            display:"flex",
            backgroundColor:"#fff",
            borderRadius:"10px",
            boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            width: "80%",
            maxWidth: "900px"
        },
        loginImageContainer:{
            width: "50%",
            background: "#f8f9fa",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
        },
        loginImage:{
            maxWidth:"100%",
            borderRadius:"10px",
            marginBottom:"20px"
        }
    };
};