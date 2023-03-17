import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";

const appThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      light: "#F20000",
      main: "#990000",
      dark: "#660404",
      contrastText: "#FFEDED",
    },
  },
};

let appTheme = createTheme(appThemeOptions);
appTheme = responsiveFontSizes(appTheme);

export { appTheme };
