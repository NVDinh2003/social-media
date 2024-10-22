import React from "react";
import google from "../../../../assets/google.png";
import "../../../../assets/global.css";
import "./Buttons.css";
import { OAuthConfig } from "../../../auth/configuration";

export const GoogleButton: React.FC = () => {
  const handleClick = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  return (
    <div className="landing-button color-gray google" onClick={handleClick}>
      <img src={google} alt="google-icon" className="landing-button-logo" />
      <p className="google-text">Đăng nhập bằng Google</p>
    </div>
  );
};
