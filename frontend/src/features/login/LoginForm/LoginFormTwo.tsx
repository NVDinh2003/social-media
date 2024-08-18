import React, { useState } from "react";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

import { ValidatedTextInput } from "../../../components/ValidatedInput/ValidatedTextInput";
import { DisableValidatedInput } from "../../../components/ValidatedInput/DisableValidatedInput";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { VisibilityOffOutlined } from "@mui/icons-material";

import "./LoginForms.css";

interface LoginFormTwoProps {
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormTwo: React.FC<LoginFormTwoProps> = ({ setPassword }) => {
  const state = useSelector((state: RootState) => state.user);

  const [active, setActive] = useState<boolean>(false);

  const toggleView = () => {
    setActive(!active);
  };

  return (
    <div className="login-form-two-container">
      <div className="login-form-content">
        <h1 className="login-form-header">Enter your password</h1>
        <DisableValidatedInput label={"Username"} value={state.username} />

        <div className="login-form-two-password">
          <ValidatedTextInput
            valid={true}
            name={"password"}
            label={"Password"}
            changeValue={setPassword}
            attributes={{
              minLength: 8,
              type: active ? "text" : "password",
            }}
          />

          <div className="login-form-two-password-icon" onClick={toggleView}>
            {active ? (
              <VisibilityOffOutlined
                sx={{
                  fontSize: "24px",
                }}
              />
            ) : (
              <VisibilityOutlinedIcon
                sx={{
                  fontSize: "24px",
                }}
              />
            )}
          </div>
          <p className="login-form-two-forgot color-blue">Forgot Password ?</p>
        </div>
      </div>
    </div>
  );
};
