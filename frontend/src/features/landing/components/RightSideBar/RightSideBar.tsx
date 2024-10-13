import React from "react";

import "./RightSideBar.css";
import "../../../../assets/global.css";
import LogoBlue from "../../../../assets/logo/66e00aa8a33e6.png";
import { GoogleButton } from "../Buttons/GoogleButton";
import { AppleButton } from "../Buttons/AppleButton";
import { SignUpButton } from "../Buttons/SignUpButton";
import { SignInButton } from "../Buttons/SignInButton";

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
      <h1 className="right-side-bar-h1">HeartShare</h1>
      <h2 className="right-side-bar-h2">Tham gia ngay nào 😘</h2>
      <div className="right-side-bar-signup-wrapper">
        <GoogleButton />
        <AppleButton />

        <div className="right-side-bar-divider">
          <div className="right-side-bar-line"></div>
          <p className="right-side-bar-or">hoặc</p>
          <div className="right-side-bar-line"></div>
        </div>

        <SignUpButton handleClick={toggleRegister} />
        <p className="right-side-bar-legal color-gray">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <span className="link color-blue">Điều khoản dịch vụ</span> và{" "}
          <span className="link color-blue">Chính sách bảo mật</span>, bao gồm{" "}
          <span className="link color-blue">Sử dụng cookie.</span>
        </p>
      </div>

      <div className="right-side-bar-login-wrapper">
        <h2 className="right-side-bar-h2 h2-sign-in-text">
          Đã có tài khoản, đăng nhập ngay !
        </h2>
        <SignInButton handleClick={toggleLogin} />
      </div>
    </div>
  );
};
