import React from "react";

import apple from "../../../../assets/apple.png";
import "../../../../assets/global.css";
import "./Buttons.css";

export const AppleButton: React.FC = () => {
  return (
    <div className="landing-button apple">
      <img src={apple} alt="apple-icon" className="landing-button-logo" />
      <p className="apple-text">Đăng nhập bằng Apple</p>
    </div>
  );
};
