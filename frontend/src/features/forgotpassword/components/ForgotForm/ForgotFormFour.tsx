import React, { useState } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import "./ForgotForm.css";
import "../../../../assets/global.css";

interface ForgotFormFourProps {
  updatePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  matching: boolean;
}

export const ForgotFormFour: React.FC<ForgotFormFourProps> = ({
  updatePassword,
  matching,
}) => {
  //
  const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
  const [confirmToggle, setConfirmToggle] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordToggle(!passwordToggle);
  };

  const toggleConfirm = () => {
    setConfirmToggle(!confirmToggle);
  };

  return (
    <div className="forgot-form-container">
      <h1 className="forgot-form-header">Choose a new password</h1>

      <p className="forgot-form-text color-gray">
        Make sure your new password is 8 characters or more. Try including
        numbers, letters, and punctuation marks for a{" "}
        <span className="link color-blue">strong password</span>.
      </p>

      <p className="forgot-form-text color-gray">
        You'll be logged out of all active Fwitter session after your password
        is change!
      </p>

      <div className="forgot-form-four-password-wrapper">
        <ValidatedTextInput
          valid={true}
          label={"New Password"}
          name={"password"}
          attributes={{
            minLength: 8,
            type: passwordToggle ? "text" : "password",
          }}
          changeValue={updatePassword}
        />
        <div
          onClick={togglePassword}
          className="forgot-form-four-password-icon"
        >
          {passwordToggle ? (
            <VisibilityOffOutlinedIcon
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
      </div>

      <div className="forgot-form-four-password-wrapper">
        <ValidatedTextInput
          valid={matching ? true : false}
          label={"Confirm New Password"}
          name={"confirm"}
          attributes={{
            minLength: 8,
            type: confirmToggle ? "text" : "password",
          }}
          changeValue={updatePassword}
        />
        <div onClick={toggleConfirm} className="forgot-form-four-password-icon">
          {confirmToggle ? (
            <VisibilityOffOutlinedIcon
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
      </div>

      {!matching ? (
        <p className="login-form-error color-red">Password must match</p>
      ) : (
        <></>
      )}
    </div>
  );
};
