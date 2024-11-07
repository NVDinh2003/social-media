import React, { useState } from "react";

import { ForgotRadioButton } from "../ForgotRadioButton/ForgotRadioButton";
import "./ForgotForm.css";
import "../../../../assets/global.css";

interface ForgotFormTwoProps {
  email: string;
  phone: string;
}

export const ForgotFormTwo: React.FC<ForgotFormTwoProps> = ({
  email,
  phone,
}) => {
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

  const transformEmail = (email: string): string => {
    let transformed = "";
    let domain = false;
    for (let i = 0; i < email.length; i++) {
      if (i < 3) transformed += email.charAt(i);
      else if (email.charAt(i) === "@") {
        transformed += email.charAt(i++);
        transformed += email.charAt(i);
        domain = true;
      } else if (domain === true && email.charAt(i) === ".")
        transformed += email.charAt(i);
      else transformed += "*";
    }

    return transformed;
  };
  return (
    <div className="forgot-form-container">
      <h1 className="forgot-form-header">Bạn muốn gửi mã xác nhận đến đâu?</h1>

      <p className="forgot-form-text color-gray">
        Trước khi thay đổi mật khẩu, chúng tôi cần xác nhận rằng đó thật sự là
        bạn.
      </p>
      <p className="forgot-form-text color-gray">
        Hãy chọn nơi bạn muốn gửi mã xác nhận
      </p>

      <div className="forgot-form-two-select-group">
        <p className="forgot-form-two-select-text">
          Gửi email đến {transformEmail(email)}
        </p>
        <ForgotRadioButton
          clicked={emailActive}
          handleClick={handleEmailClick}
        />
      </div>

      <div className="forgot-form-two-select-group">
        <p className="forgot-form-two-select-text">
          Gửi mã qua số điện thoại có đuôi là{" "}
          {phone ? phone.substring(phone.length - 4, phone.length) : "N/A"}
        </p>
        <ForgotRadioButton
          clicked={phoneActive}
          handleClick={handlePhoneClick}
        />
      </div>
    </div>
  );
};
