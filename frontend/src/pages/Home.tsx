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

  // useEffect(() => {
  //   if (jwt !== "" && state.token !== "") dispatch(getUserByToken(state.token));
  //   else if (jwt === "" && state.token !== "") setJwt(state.token);
  //   else if (jwt !== "" && state.token === "") setToken(jwt);
  //   else navigate("/");
  // }, [state.token]);

  useEffect(() => {
    if (jwt !== "" && state.token === "") {
      // Nếu có jwt trong localStorage nhưng state.token rỗng, set lại token và lấy user info
      dispatch(setToken(jwt));
      dispatch(getUserByToken(jwt));
    } else if (jwt !== "" && state.token !== "") {
      // Nếu cả jwt và state.token đều tồn tại, lấy user info
      dispatch(getUserByToken(state.token));
    } else if (jwt === "" && state.token !== "") {
      // Nếu không có jwt trong localStorage nhưng có state.token, lưu lại jwt
      setJwt(state.token);
    } else {
      // Không có jwt hoặc state.token, điều hướng về trang login
      navigate("/");
    }
  }, [jwt, state.token]);

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
