import React from "react";

import "../../../../assets/global.css";
import "./Buttons.css";

interface SignUpButtonProps {
  handleClick: () => void;
}

export const SignUpButton: React.FC<SignUpButtonProps> = ({ handleClick }) => {
  return (
    <div className="landing-button  sign-up" onClick={handleClick}>
      <p className="sign-up-text">Sign up with email</p>
    </div>
  );
};
