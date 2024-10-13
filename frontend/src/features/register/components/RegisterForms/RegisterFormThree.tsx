import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { ValidatedDisplay } from "../../../../components/ValidatedInput/ValidatedDisplay";
import { stringifyDate, stringifyVNDate } from "../../../../utils/DateUtils";

import "./RegisterForm.css";
import "../../../../assets/global.css";

export const RegisterFormThree: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-header">Tạo tài khoản của bạn</h1>

        <div className="register-three-value-wrapper">
          <ValidatedDisplay
            label={"Họ tên"}
            value={`${state.firstName} ${state.lastName}`}
          />
        </div>

        <div className="register-three-value-wrapper">
          <ValidatedDisplay label={"Email"} value={state.email} />
          {state.error ? (
            <p className="register-error color-red">
              Email bạn nhập đã được sử dụng, vui lòng dùng một email khác.
            </p>
          ) : (
            <></>
          )}
        </div>

        <div
          className={
            state.error
              ? "register-three-value-wrapper"
              : "register-three-bottom"
          }
        >
          <ValidatedDisplay
            label={"Ngày sinh"}
            value={stringifyVNDate(state.dob)}
          />
        </div>

        <p className="register-text-sm color-gray">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <span className="register-link color-blue">Điều khoản Dịch vụ</span>{" "}
          và{" "}
          <span className="register-link color-blue">
            Chính sách Quyền riêng tư
          </span>
          , bao gồm{" "}
          <span className="register-link color-blue">Sử dụng Cookie</span>.
          HeartShare có thể sử dụng thông tin liên hệ của bạn, bao gồm email và
          số điện thoại cho các mục đích đã nêu trong Chính sách Quyền riêng tư,
          như giữ an toàn cho tài khoản của bạn và cá nhân hóa dịch vụ của chúng
          tôi, bao gồm quảng cáo.{" "}
          <span className="register-link color-blue">Tìm hiểu thêm</span>. Người
          khác sẽ có thể tìm thấy bạn qua email hoặc số điện thoại nếu bạn cung
          cấp, trừ khi bạn chọn tùy chỉnh{" "}
          <span className="register-link color-blue">tại đây</span>.
        </p>
      </div>
    </div>
  );
};
