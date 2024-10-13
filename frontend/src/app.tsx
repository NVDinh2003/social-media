import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/global.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Landing } from "./pages/Landing";
import { Theme } from "./utils/GlobalInterface";
import { LayoutPage } from "./pages/LayoutPage";
import { Feed } from "./features/feed/components/Feed/Feed";
import { Profile } from "./pages/Profile";
import { useSelector } from "react-redux";
import { RootState } from "./redux/Store";
import { useEffect } from "react";
import { ViewPost } from "./pages/ViewPost";
import { useWebsocket } from "./hooks/useWebsocket";
import NotificationsPage from "./pages/NotificationsPage";

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
  /* font-family:"Ubuntu", "sans-serif"; */
  font-weight: bold;
}`;

export const App = () => {
  const user = useSelector((state: RootState) => state.user.loggedIn);
  const { connected, connect } = useWebsocket();

  useEffect(() => {
    if (user && !connected) {
      connect();
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Landing></Landing>} />

          <Route path="" element={<LayoutPage />}>
            <Route path="/home" element={<Feed />} />
            <Route path="/explore" element={<>Explore</>} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/post/:postId" element={<ViewPost />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route
              path="/notifications/verified"
              element={<NotificationsPage />}
            />
            <Route
              path="/notifications/mentions"
              element={<NotificationsPage />}
            />
          </Route>

          {/* <Route path="/home" element={<Home></Home>} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
