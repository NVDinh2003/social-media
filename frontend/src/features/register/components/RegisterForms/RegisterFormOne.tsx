import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import "./RegisterForm.css";
import "../../../../assets/global.css";
import { RegisterDateInput } from "../RegisterDateInput/RegisterDateInput";
import { RegisterNameInputs } from "../RegisterNameInput/RegisterNameInputs";
import { RegisterEmailInput } from "../RegisterEmailInput/RegisterEmailInput";

export const RegisterFormOne: React.FC = () => {
  const registerState = useSelector((state: RootState) => state.register);

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-header">Tạo tài khoản</h1>
        <RegisterNameInputs
          firstName={registerState.firstName}
          lastName={registerState.lastName}
        />

        <RegisterEmailInput email={registerState.email} />

        <div className="register-one-dob-wrapper">
          <h4 className="register-h4">Ngày sinh</h4>
          <span className="register-text-sm color-gray">
            Thông tin này sẽ không được hiển thị công khai. Vui lòng xác nhận
            ngày sinh của bạn !
          </span>
        </div>
        <RegisterDateInput date={registerState.dob} />
      </div>
    </div>
  );
};
