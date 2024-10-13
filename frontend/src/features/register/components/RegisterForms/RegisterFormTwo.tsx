import React from "react";

import "./RegisterForm.css";
import "../../../../assets/global.css";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";

export const RegisterFormTwo: React.FC = () => {
  return (
    <div className="register-container">
      <div className="register-content register-form-two">
        <h1 className="register-header">Tùy chỉnh trải nghiệm của bạn</h1>
        <h3 className="register-subheader">
          Theo dõi nơi bạn nhìn thấy nội dung từ HeartShare trên web.
        </h3>

        <div className="register-two-checkbox-wrapper">
          <p className="register-text">
            HeartShare sử dụng dữ liệu này để cá nhân hóa trải nghiệm của bạn.
            Lịch sử duyệt web này sẽ không bao giờ được lưu trữ cùng với tên,
            email hoặc số điện thoại của bạn.
          </p>
          <Checkbox />
        </div>
        <p className="register-text color-gray">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <span className="register-link color-blue">Điều khoản</span>,{" "}
          <span className="register-link color-blue">
            Chính sách quyền riêng tư
          </span>{" "}
          và <span className="register-link color-blue">Sử dụng cookie</span>{" "}
          của chúng tôi. HeartShare có thể sử dụng thông tin liên hệ của bạn,
          bao gồm email và số điện thoại cho các mục đích đã nêu trong Chính
          sách quyền riêng tư.{" "}
          <span className="register-link color-blue">Tìm hiểu thêm</span>
        </p>
      </div>
    </div>
  );
};
