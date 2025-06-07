import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";

export const useSignInFormStyles = (): { [key: string]: React.CSSProperties } => {
  const responsiveCssValue = useResponsiveCssValue();

  return {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      padding: responsiveCssValue("10px", "0"),
      paddingBlock: "0",
    },
    container: {
      display: "flex",
      flexDirection: responsiveCssValue("column", "row"), // stack on small, row on large
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      width: responsiveCssValue("95%", "70%"),
      maxWidth: "900px",
    },
    imageContainer: {
      width: responsiveCssValue("90%", "50%"),
      background: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: responsiveCssValue("15px", "30px"),
    },
    image: {
      width: responsiveCssValue("60%" ,"80%"),
      marginTop: responsiveCssValue("15px", "0px"),
      borderRadius: "10px",
    },
    form: {
      width: responsiveCssValue("80%", "50%"),
      paddingInline: responsiveCssValue("20px", "30px"),
      paddingBlock: responsiveCssValue("0px", "30px"),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    formTitle: {
      textAlign: "center",
      marginBottom: responsiveCssValue("15px", "20px"),
      color: "#333",
      fontSize: responsiveCssValue("1.4rem", "1.8rem"),
      fontWeight:"bold"
    },
    formLabel: {
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#555",
      display: "inline-flex",
      fontSize: responsiveCssValue("0.8rem", "1rem"),
    },
    formInput: {
      width: "100%",
      padding: responsiveCssValue("6px", "8px"),
      marginBottom: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: responsiveCssValue("0.9rem", "1rem"),
    },
    inputIcon: {
      marginRight: "10px",
      color: "#696969",
      fontSize: responsiveCssValue("1rem", "1.2rem"),
    },
    formButton: {
      width: "100%",
      padding: responsiveCssValue("8px", "12px"),
      border: "none",
      borderRadius: "5px",
      background: "#5a46fa",
      color: "#fff",
      fontSize: responsiveCssValue("1rem", "1.2rem"),
      cursor: "pointer",
      transition: "background 0.3s ease",
      fontWeight: "bold"
    },
    linkOptions: {
      display: "flex",
      flexDirection: responsiveCssValue("row", "row"),
      justifyContent: "space-between",
      alignItems: responsiveCssValue("flex-start", "center"),
      marginBlock: "10px",
      gap: responsiveCssValue("8px", "0"),
    },
    extraLink: {
      color: "#5a46fa",
      textDecoration: "none",
      fontSize: responsiveCssValue("0.85rem", "0.9rem"),
      fontWeight:"bold",
      cursor:"pointer"
    }
  };
};
