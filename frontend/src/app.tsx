import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/global.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Landing } from "./pages/Landing";
import { Theme } from "./utils/GlobalInterface";
import { Home } from "./pages/Home";

const theme: Theme = {
  colors: {
    blue: "#1DA1F2",
    black: "#14171a",
    darkGray: "#657786",
    gray: "#AAB8C2",
    lightGray: "#E1E8ED",
    white: "#F5F8FA",
    error: "red",
  },
};

const GlobalStyle = createGlobalStyle`
*{
  font-family:'IBM Plex Sans', sans-serif;
  font-weight: bold;
}`;

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Landing></Landing>} />
          <Route path="/home" element={<Home></Home>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
