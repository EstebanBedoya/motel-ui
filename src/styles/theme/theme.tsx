/** @package */
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    violet?: PaletteOptions["primary"];
  }
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0054A3",
    },
    success: {
      main: "#00AA07",
    },
    error: {
      main: "#E40000",
      light: "#E4000080",
    },
    warning: {
      main: "#FFA800",
      light: "#FFA80080",
    },
    violet: {
      main: "#9431D0",
    },
    text:{
      primary: "#000000",
      secondary: "#00000080",
    }
  },
  typography: {
    fontFamily: ['sans-serif'].join(','),
  },
});

export default theme;
