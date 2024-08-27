import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootState, AppDispatch } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../redux/Slices/UserSlice";

import "./Home.css";
import { Navigation } from "../components/Navigation/Navigation";
import { Feed } from "../features/feed/components/Feed/Feed";

export const Home: React.FC = () => {
  //
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

  useEffect(() => {
    if (jwt !== "" && state.token !== "") dispatch(getUserByToken(state.token));
    else if (jwt === "" && state.token !== "") setJwt(state.token);
    else if (jwt !== "" && state.token === "") setToken(jwt);
    else navigate("/");
  }, [state.token]);

  return (
    <div className="home">
      <div className="home-layout">
        <div className="home-navigation-section">
          <Navigation />
        </div>

        <div className="home-content-section">
          <Feed />
        </div>

        <div className="home-info-section"></div>
      </div>
    </div>
  );
};
