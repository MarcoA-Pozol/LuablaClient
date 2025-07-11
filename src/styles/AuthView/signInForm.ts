import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";

export const useSignInFormStyles = (): { [key: string]: React.CSSProperties } => {
    const responsiveCssValue = useResponsiveCssValue();
    
    return {
        page: {
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh"
        },
        container: {
            display:"flex",
            backgroundColor:"#fff",
            borderRadius:"10px",
            boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            width: "80%",
            maxWidth: "900px"
        },
        imageContainer:{
            width: "50%",
            background: "#f8f9fa",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
        },
        image:{
            maxWidth:"100%",
            borderRadius:"10px",
            marginBottom:"20px"
        },
        form:{
            width:"50%",
            padding:"30px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
        },
        formTitle:{
            textAlign:"center",
            marginBottom:"20px",
            color:"#333"
        },
        formLabel:{
            marginBottom:"5px",
            fontWeight:"bold",
            color:"#555",
            display:"inline-flex"
        },
        formInput:{
            width:"100%",
            padding:"10px",
            marginBottom:"15px",
            border:"1px solid #ddd",
            borderRadius:"5px",
            transition:"box-shadow 0.3s ease"
        },
        inputIcon:{
            marginRight:"10px",
            color:"#696969",
            fontSize:"1.2rem"
        },
        formButton:{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            background: "#5a46fa",
            color: "#fff",
            fontSize: "1.2rem",
            cursor: "pointer",
            transition: "background 0.3s ease",
        },
        linkOptions:{
            display:"flex",
            justifyContent:"space-between",
            marginTop:"10px"
        },
        forgotPasswordLink:{
            color:"#5a46fa",
            textDecoration:"none",
            fontSize:"0.9rem"
        },
        noAccountLink:{
            color:"#5a46fa",
            textDecoration:"none",
            fontSize:"0.9rem"
        }
    };
};