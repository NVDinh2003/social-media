import React from "react";

import blueLogo from "../../../assets/logo/66e00aa8a33e6.png";
import "./LoginModalTop.css";

interface LoginModelTopProps {
  closeModal: () => void;
}

export const LoginModalTop: React.FC<LoginModelTopProps> = ({ closeModal }) => {
  return (
    <div className="login-modal-top">
      <div className="login-modal-top-left">
        <div className="login-modal-top-shadow" onClick={closeModal}>
          x
        </div>
      </div>

      <div className="login-modal-top-middle">
        <img src={blueLogo} alt="" className="login-modal-top-logo" />
      </div>
      <div className="login-modal-top-right"></div>
    </div>
  );
};
