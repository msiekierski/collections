import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./common/components/NavBar/NavBar";
import { DARK_MODE, LIGHT_MODE } from "./common/constants/themeModes";
import { Counter } from "./features/counter/Counter";
import { selectUser } from "./features/user/userSlice";
import ContentSwitch from "./routes/ContentSwitch";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./i18n";

function App() {
  const { settings } = useSelector(selectUser);
  i18next.changeLanguage(settings.language);

  const darkTheme = createTheme({
    palette: { mode: "dark" },
  });

  const lightTheme = createTheme({});

  return (
    <BrowserRouter>
      <ThemeProvider theme={settings.isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <NavBar />
        <ContentSwitch />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
