import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { resetUsername } from "../redux/Slices/UserSlice";

import RegisterModal from "../features/register";
import { RightSideBar, LandingFooter } from "../features/landing";
import ForgotPasswordModal from "../features/forgotpassword";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

import whiteLogo from "../assets/fwitter-logo-large-white.png";

import "./Landing.css";
import "../assets/global.css";
import LoginModal from "../features/login";

export const Landing: React.FC = () => {
  //
  const dispatch: AppDispatch = useDispatch();

  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);

  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const toggleRegister = () => {
    setRegister(!register);
  };

  const toggleLogin = () => {
    setLogin(!login);
    dispatch(resetUsername());
  };

  const toggleForgotPassword = () => {
    setLogin(false);
    setForgotPassword(!forgotPassword);
  };

  useEffect(() => {
    if (jwt !== "") navigate("/home");
  }, [jwt]);

  return (
    <div className="home-container bg-color">
      {register ? <RegisterModal toggleModal={toggleRegister} /> : <></>}
      {login ? (
        <LoginModal
          toggleModal={toggleLogin}
          toggleRegister={toggleRegister}
          toggleForgot={toggleForgotPassword}
        />
      ) : (
        <></>
      )}

      {forgotPassword ? (
        <ForgotPasswordModal toggleModal={toggleForgotPassword} />
      ) : (
        <></>
      )}

      <div className="landing-layout">
        <div className="landing-top-left bg-blue">
          <img src={whiteLogo} className="landing-top-left-logo" />
        </div>

        <div className="landing-top-right">
          <RightSideBar
            toggleLogin={toggleLogin}
            toggleRegister={toggleRegister}
          />
        </div>

        <div className="landing-bottom">
          <LandingFooter />
        </div>
      </div>
    </div>
  );
};
