import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";

export const useSignUpFormStyles = (): { [key: string]: React.CSSProperties } => {
  const responsiveCssValue = useResponsiveCssValue();

  return {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: responsiveCssValue("82vh", "90vh"),
      padding: responsiveCssValue("10px", "0"),
      paddingBlock: "0",
    },
    container: {
      display: "flex",
      flexDirection: responsiveCssValue("column", "row"),
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      width: responsiveCssValue("95%", "70%"),
    },
    imageContainer: {
      width: responsiveCssValue("90%", "50%"),
      background: "#f8f9fa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingInline: responsiveCssValue("15px", "30px"),
    },
    image: {
      width: responsiveCssValue("60%", "80%"),
      marginTop: responsiveCssValue("15px", "0"),
      borderRadius: "10px",
    },
    form: {
      width: responsiveCssValue("80%", "50%"),
      paddingInline: responsiveCssValue("30px", "30px"),
      paddingBlock: responsiveCssValue("0", "30px"),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      textAlign: "center",
      marginBottom: responsiveCssValue("15px", "20px"),
      color: "#333",
      fontSize: responsiveCssValue("1.4rem", "1.8rem"),
      fontWeight: "bold",
    },
    label: {
      display: "inline-flex",
      alignItems: "center",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#555",
      fontSize: responsiveCssValue("0.85rem", "1rem"),
    },
    input: {
      width: "100%",
      padding: responsiveCssValue("6px", "8px"),
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: responsiveCssValue("0.8rem", "1rem"),
      marginLeft: "10px",
    },
    select: {
      width: "100%",
      padding: responsiveCssValue("6px", "8px"),
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: responsiveCssValue("0.9rem", "1rem"),
      marginLeft: "10px",
    },
    fileInput: {
      fontSize: responsiveCssValue("0.9rem", "1rem"),
      marginLeft: "10px",
    },
    icon: {
      color: "#696969",
      fontSize: responsiveCssValue("1rem", "1.2rem"),
    },
    button: {
      width: "100%",
      padding: responsiveCssValue("5px", "12px"),
      background: "#5a46fa",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: responsiveCssValue("1rem", "1.2rem"),
      transition: "background 0.3s ease",
    },
    extraOptions: {
      textAlign: "center",
      marginTop: responsiveCssValue("0px", "10px"),
      paddingBlock: responsiveCssValue("10px", "0"),
    },
    link: {
      color: "#5a46fa",
      textDecoration: "none",
      fontSize: responsiveCssValue("0.85rem", "0.9rem"),
      fontWeight: "bold",
      cursor: "pointer",
    },
  };
};
