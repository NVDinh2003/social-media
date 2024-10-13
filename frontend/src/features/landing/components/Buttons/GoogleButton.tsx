import React from "react";

import google from "../../../../assets/google.png";
import "../../../../assets/global.css";
import "./Buttons.css";

export const GoogleButton: React.FC = () => {
  return (
    <div className="landing-button color-gray google">
      <img src={google} alt="google-icon" className="landing-button-logo" />
      <p className="google-text">Đăng nhập bằng Google</p>
    </div>
  );
};
