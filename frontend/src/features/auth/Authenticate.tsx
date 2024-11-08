import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Authenticate: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

  useEffect(() => {
    // console.log(window.location.href);

    const baseUrl = process.env.REACT_APP_API_URL;
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];
      // console.log(authCode);

      fetch(`${baseUrl}/auth/outbound/authentication?code=${authCode}`, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data);

          if (data?.token) {
            // console.log(data);
            setJwt(data.token);
            // console.log(jwt);
            setIsLoggedin(true); // Đăng nhập thành công
          } else {
            console.error("Token is missing in response");
          }
        })
        .catch((error) => {
          console.error("Error during fetch:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (jwt !== "") navigate("/home");
  }, [jwt]);

  // useEffect(() => {
  //   console.log(window.location.href);

  //   const authCodeRegex = /code=([^&]+)/;
  //   const isMatch = window.location.href.match(authCodeRegex);

  //   if (isMatch) {
  //     const authCode = isMatch[1];
  //     console.log(authCode);

  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}/auth/outbound/authentication?code=${authCode}`
  //       )
  //       .then((response) => {
  //         const { token, user, authenticated } = response.data;

  //         if (authenticated) {
  //           dispatch(setToken(token)); // Lưu token vào Redux store
  //           dispatch(getUserByToken(user));
  //           setIsAuthenticating(false);
  //           navigate("/home");
  //         } else {
  //           console.error("Authentication failed");
  //           setIsAuthenticating(false);
  //           navigate("/");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Authentication failed:", error);
  //         setIsAuthenticating(false);
  //         navigate("/");
  //       });
  //   } else {
  //     setIsAuthenticating(false);
  //     navigate("/");
  //   }
  // }, [dispatch, navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress></CircularProgress>
        <Typography>Authenticating...</Typography>
      </Box>
    </>
  );
};
