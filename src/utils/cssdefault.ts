
type hh = Record<string, string>
export let cssdefalult: Record<string,
  hh> = {
  div: {
    /* SIZE */
    width: "100px",
    height: "100px",
    padding: "0px",
    text: "",
    /* BACKGROUND */
    backgroundColor: "#ffffff",
    backgroundImage: "none",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    /* BORDER */
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "16px",
    outline: "none",

    /* SHADOW */
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",

    /* TEXT */
    color: "#0f172a",
    fontFamily: "system-ui, sans-serif",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "1.6",
    letterSpacing: "0.2px",
    textAlign: "left",
    whiteSpace: "normal",

    /* LAYOUT */
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "flex-start",
    justifyContent: "flex-start",

    /* EFFECTS */
    opacity: "1",
    transform: "none",
    transition: "all 0.25s ease",
    position: "relative", // needed for zIndex to work
    zIndex: "10",
    /* BEHAVIOR */
    overflow: "hidden",
    cursor: "default",
  }
  , p: {
    color: "#334155",
    fontFamily: "system-ui, sans-serif",
    fontSize: "15px",
    fontWeight: "400",
    text: "its a ptext",

    margin: "0",
    padding: "0px",

    whiteSpace: "nowrap",
    position: "absolute"

    , width: "10px",
    zIndex: "10"
  }
  ,
  input: {
    width: "160px",
    height: "48px",
    // text: "",

    // padding: "0px 14px",

    // backgroundImage: "none",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",

    backgroundColor: "#ffffff",
    color: "red",

    border: "1px solid #d1d5db",
    borderRadius: "10px",
    outline: "none",

    fontFamily: "system-ui, sans-serif",

    textAlign: "left",
    textDecoration: "none",
    textTransform: "none",
    whiteSpace: "nowrap",

    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    // opacity: "1",

    // transition: "all 0.3s ease",
    // transform: "none",
    position: "relative",
    zIndex: "10",
    placeholder: "enter your name",
    // optional placeholder styling support (if handled separately)
    placeholderColor: "#9ca3af"
  }
  ,
  button: {
    width: "160px",
    height: "48px",
    text: "button",
    padding: "0px",

    backgroundImage: "url('https://example.com/button-bg.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    backgroundColor: "#2563eb",
    color: "#ffffff",

    border: "1px solid transparent",
    borderRadius: "10px",
    outline: "none",

    fontFamily: "system-ui, sans-serif",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "1.2",
    letterSpacing: "0.4px",
    textAlign: "center",
    textDecoration: "none",
    textTransform: "none",
    whiteSpace: "nowrap",

    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
    opacity: "1",

    transition: "all 0.3s ease",
    transform: "none",
    position: "relative", // needed for zIndex to work
    zIndex: "10",
  }




}

export type eleent = keyof typeof cssdefalult


export const cssValueOptions: Record<string, string[]> = {
  /* ================= BACKGROUND ================= */

  backgroundRepeat: [
    "repeat", "space", "round", "no-repeat",
    "repeat repeat", "repeat space", "repeat round", "repeat no-repeat",
    "space repeat", "space space", "space round", "space no-repeat",
    "round repeat", "round space", "round round", "round no-repeat",
    "no-repeat repeat", "no-repeat space", "no-repeat round", "no-repeat no-repeat"
  ],

  backgroundSize: [
    "auto",
    "cover",
    "contain",
    "100%",
    "100% 100%",
    "auto auto"
  ],

  backgroundPosition: [
    "left", "right", "top", "bottom", "center",
    "left top", "left center", "left bottom",
    "right top", "right center", "right bottom",
    "center top", "center center", "center bottom"
  ],

  backgroundImage: [
    'url("")',
    "none",
    "linear-gradient(to right, red, blue)",
    "linear-gradient(to bottom, black, white)",
    "radial-gradient(circle, red, yellow)"
  ],

  /* ================= TEXT ================= */

  fontSize: [
    "12px", "14px", "16px", "18px", "20px",
    "24px", "28px", "32px", "36px", "48px",
    "1rem", "1.5rem", "2rem"
  ],

  fontFamily: [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Verdana",
    "sans-serif",
    "serif",
    "monospace"
  ],
  flexDirection: [
    "row",
    "row-reverse",
    "column",
    "column-reverse"
  ],

  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly"
  ],

  alignItems: [
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "baseline"
  ],
  fontWeight: [
    "normal", "bold", "lighter", "bolder",
    "100", "200", "300", "400", "500",
    "600", "700", "800", "900"
  ],

  lineHeight: [
    "normal",
    "1",
    "1.2",
    "1.5",
    "2",
    "24px",
    "32px",
    "40px"
  ],

  letterSpacing: [
    "normal",
    "0px",
    "0.5px",
    "1px",
    "2px",
    "4px"
  ],

  textAlign: [
    "left", "right", "center", "justify", "start", "end"
  ],

  textDecoration: [
    "none", "underline", "overline", "line-through"
  ],

  textTransform: [
    "none", "uppercase", "lowercase", "capitalize"
  ],

  whiteSpace: [
    "normal", "nowrap", "pre", "pre-wrap", "pre-line"
  ],

  /* ================= BORDER ================= */

  border: [
    "none",
    "1px solid black",
    "2px solid black",
    "1px dashed black",
    "2px dashed black",
    "1px dotted black"
  ],

  borderRadius: [
    "0",
    "4px",
    "8px",
    "12px",
    "50%",
    "9999px"
  ],

  outline: [
    "none",
    "1px solid black",
    "2px solid red"
  ],

  /* ================= LAYOUT ================= */

  display: [
    "block",
    "inline",
    "inline-block",
    "flex",
    "grid",
    "none"
  ],

  position: [
    "static",
    "relative",
    "absolute",
    "fixed",
    "sticky"
  ],

  overflow: [
    "visible",
    "hidden",
    "scroll",
    "auto"
  ],

  /* ================= EFFECTS ================= */

  boxShadow: [
    "none",
    "0px 2px 4px rgba(0,0,0,0.2)",
    "0px 4px 8px rgba(0,0,0,0.3)",
    "0px 10px 20px rgba(0,0,0,0.4)"
  ],

  opacity: [
    "0",
    "0.25",
    "0.5",
    "0.75",
    "1"
  ],

  transition: [
    "none",
    "all 0.3s ease",
    "all 0.5s ease-in-out",
    "transform 0.3s ease",
    "opacity 0.3s ease"
  ],

  transform: [
    "none",
    "scale(1.1)",
    "scale(0.9)",
    "rotate(45deg)",
    "translateX(10px)",
    "translateY(10px)"
  ],

  /* ================= Z-INDEX ================= */

  zIndex: [
    "0",
    "1",
    "10",
    "100",
    "1000"
  ]
};

