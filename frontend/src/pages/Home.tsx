import React, { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootState, AppDispatch } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

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
    if (jwt === "" && state.token !== "") {
      console.log("There is no token in localstorage, but theres one in state");
      console.log(
        "this means the user just logged in, store the token in localstorage"
      );
      setJwt(state.token);
    } else if (jwt !== "" && state.token === "") {
      console.log("user returned to the website and is logged in");
      console.log("need to store the token in the userSlice");
      dispatch(setToken(jwt));
    } else {
      console.log("user is not logged in");
      console.log("navigate to the login page");
      navigate("/");
    }
  }, []);

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
