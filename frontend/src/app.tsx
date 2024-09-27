import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/global.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Landing } from "./pages/Landing";
import { Theme } from "./utils/GlobalInterface";
import { Home } from "./pages/Home";
import { LayoutPage } from "./pages/LayoutPage";
import { Feed } from "./features/feed/components/Feed/Feed";
import { Profile } from "./pages/Profile";
import { Client, over } from "stompjs";
import { useSelector } from "react-redux";
import { RootState } from "./redux/Store";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { ViewPost } from "./pages/ViewPost";

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
  const API_URL = process.env.REACT_APP_API_URL;
  let stompClient: Client | null = null;
  const user = useSelector((state: RootState) => state.user.loggedIn);
  const [connected, setConnected] = useState<boolean>(false);

  function connect() {
    if (user) {
      const socket = new SockJS(`${API_URL}/ws`);
      stompClient = over(socket);

      stompClient.connect({}, onConnected, onError);
    }
  }

  function onConnected() {
    // console.log("Connected to websocket server");
    setConnected(true);
    if (stompClient) {
      stompClient.subscribe(
        `/user/${user?.username}/notifications`,
        onMessageReceived
      );
    }
  }

  function onError() {
    setConnected(false);
  }

  function onMessageReceived(payload: any) {
    console.log(payload);
  }

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
          </Route>

          {/* <Route path="/home" element={<Home></Home>} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
