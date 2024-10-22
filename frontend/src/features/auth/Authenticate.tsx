import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, getUserByToken } from "../../redux/Slices/UserSlice";
import axios from "axios";
import { AppDispatch } from "../../redux/Store";

export const Authenticate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/auth/outbound/authentication?code=${authCode}`
        )
        .then((response) => {
          console.log(response);
          const token = response.data.token;
          dispatch(setToken(token));
          dispatch(getUserByToken(token));
          setIsAuthenticating(false);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Authentication failed:", error);
          setIsAuthenticating(false);
          navigate("/");
        });
    } else {
      setIsAuthenticating(false);
      navigate("/");
    }
  }, [dispatch, navigate]);

  if (isAuthenticating) {
    return <div>Đang xác thực...</div>;
  }

  return null;
};
