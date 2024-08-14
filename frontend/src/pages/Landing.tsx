import React from "react";

import RegisterModal from "../features/register";

import "./Landing.css";
import "../assets/global.css";

export const Landing: React.FC = () => {
  return (
    <div className="home-container bg-color">
      <RegisterModal />
    </div>
  );
};
