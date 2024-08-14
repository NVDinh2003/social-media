import React from "react";

import "./RightSideBar.css";
import "../../../../assets/global.css";
import LogoBlue from "../../../../assets/fwitter-logo-large-blue.png";

interface RightSidebarProps {
  toggleRegister: () => void;
  toggleLogin: () => void;
}

export const RightSideBar: React.FC<RightSidebarProps> = ({
  toggleRegister,
  toggleLogin,
}) => {
  return (
    <div className="right-side-bar">
      <img src={LogoBlue} alt="F-Twitter" className="right-side-bar-logo" />
      <h1 className="right-side-bar-h1">Happening now</h1>
      <h2 className="right-side-bar-h2">Join Fwitter today</h2>
      <div className="right-side-bar-signup-wrapper">
        <button>Sign up with Google</button>
        <button>Sign up with Apple</button>

        <div className="right-side-bar-divider">
          <div className="right-side-bar-line">
            <p className="right-side-bar-or">or</p>
            <div className="right-side-bar-line"></div>
          </div>
        </div>

        <button onClick={toggleRegister}>Create account</button>
        <p className="right-side-bar-legal color-gray">
          By signing up, you agree to the{" "}
          <span className="link color-blue">Terms of Service</span> and{" "}
          <span className="link color-blue">Privacy Policy</span>, including{" "}
          <span className="link color-blue">Cookie Use.</span>
        </p>
      </div>

      <div className="right-side-bar-login-wrapper">
        <h2 className="right-side-bar-h2">Already have an account?</h2>
        <button>Sign In</button>
      </div>
    </div>
  );
};
