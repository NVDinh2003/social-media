import React from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";

import "./ForgotForm.css";
import "../../../../assets/global.css";

interface ForgotFormProps {
  setCredential: (name: string) => void;
  error: boolean;
}

export const ForgotFormOne: React.FC<ForgotFormProps> = ({
  setCredential,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential(e.target.value);
  };

  return (
    <div className="forgot-form-container">
      <h1 className="forgot-form-header">Find your Fwitter Account</h1>

      <p className="forgot-form-text color-gray">
        Enter your email, phone number, or username associated with your account
        to change your password
      </p>
      <ValidatedTextInput
        valid={!error}
        name={"forgot"}
        label={"Email, Phone Number, or Username"}
        changeValue={handleChange}
      />

      {error ? <p className="color-red forgot-error">User not found</p> : <></>}
    </div>
  );
};
