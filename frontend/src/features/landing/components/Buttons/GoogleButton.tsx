import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../../../../redux/Slices/UserSlice";
import google from "../../../../assets/google.png";
import "../../../../assets/global.css";
import "./Buttons.css";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const GoogleButton: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await dispatch(loginWithGoogle(tokenResponse.access_token));
      } catch (err) {
        console.error(err);
      }
    },
    onError: (errorResponse) => console.error(errorResponse),
  });

  return (
    <div className="landing-button color-gray google" onClick={() => login()}>
      <img src={google} alt="google-icon" className="landing-button-logo" />
      <p className="google-text">Đăng nhập bằng Google !</p>
    </div>
  );
};
