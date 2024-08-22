import React from "react";
import "./ForgotForm.css";
import "../../../../assets/global.css";

export const ForgotFormTwo: React.FC = () => {
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
        <input type="radio" value="email" id="email" onChange={() => {}} />
      </div>

      <div className="forgot-form-two-select-group">
        <p className="forgot-form-two-select-text">
          Text a code to the number ending in...
        </p>
        <input type="radio" value="phone" id="phone" onChange={() => {}} />
      </div>
    </div>
  );
};
