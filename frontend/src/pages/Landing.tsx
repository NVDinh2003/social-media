import React, { useState } from "react";

import RegisterModal from "../features/register";
import { RightSideBar, LandingFooter } from "../features/landing";

import whiteLogo from "../assets/fwitter-logo-large-white.png";

import "./Landing.css";
import "../assets/global.css";
import LoginModal from "../features/login";

export const Landing: React.FC = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  const toggleRegister = () => {
    setRegister(!register);
  };

  const toggleLogin = () => {
    setLogin(!login);
  };

  return (
    <div className="home-container bg-color">
      {register ? <RegisterModal toggleModal={toggleRegister} /> : <></>}
      {login ? <LoginModal toggleModal={toggleLogin} /> : <></>}
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
