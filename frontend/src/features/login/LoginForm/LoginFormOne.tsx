import React from "react";

import { ValidatedTextInput } from "../../../components/ValidatedInput/ValidatedTextInput";
import "../../../assets/global.css";
import "./LoginFormOne.css";

export const LoginFormOne: React.FC = () => {
  return (
    <div className="login-form-one-container">
      <h1 className="login-form-header">Sign in to Fwitter</h1>
      <button>Sign in with Google</button>
      <button>Sign in with Apple</button>

      <div className="login-form-one-divider">
        <div className="login-form-one-line"></div>
        <p className="login-form-one-or">or</p>
        <div className="login-form-one-line"></div>
      </div>

      <ValidatedTextInput
        valid={true}
        name={"identifier"}
        label={"Phone, email, or username"}
        changeValue={() => {}}
      />
      <button>Next</button>
      <button className="login-form-forgot-password-button">
        Forgot password?
      </button>
      <p className="login-form-one-text color-gray">
        Don't have an account? <span className="link color-blue">Sign up</span>
      </p>
    </div>
  );
};
