import React, { useState } from "react";

import { ForgotRadioButton } from "../ForgotRadioButton/ForgotRadioButton";
import "./ForgotForm.css";
import "../../../../assets/global.css";

export const ForgotFormTwo: React.FC = () => {
  //
  const [emailActive, setEmailActive] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(false);

  const handleEmailClick = () => {
    setEmailActive(true);
    setPhoneActive(false);
  };

  const handlePhoneClick = () => {
    setEmailActive(false);
    setPhoneActive(true);
  };

  return (
    <div className="forgot-form-container">
      <h1 className="forgot-form-header">
        Where should we send a confirmation code
      </h1>

      <p className="forgot-form-text color-gray">
        Before you can change your password, we need to make sure it's really
        you.
      </p>
      <p className="forgot-form-text color-gray">
        Start by choosing where to send the confirmation code
      </p>

      <div className="forgot-form-two-select-group">
        <p className="forgot-form-two-select-text">Send an email to...</p>
        <ForgotRadioButton
          clicked={emailActive}
          handleClick={handleEmailClick}
        />
      </div>

      <div className="forgot-form-two-select-group">
        <p className="forgot-form-two-select-text">
          Text a code to the number ending in...
        </p>
        <ForgotRadioButton
          clicked={phoneActive}
          handleClick={handlePhoneClick}
        />
      </div>
    </div>
  );
};
