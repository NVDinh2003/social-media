import React, { useState, useEffect } from "react";
import { StyledInputBox, StyledInputLabel } from "./StyledInput";
import { determineValidSelectStyle } from "../../utils/DetermineStylesUtil";

import "./ValidatedInput.css";
import { ExpandMoreRounded } from "@mui/icons-material";

interface ValidatedLocationSelectorProps {
  style?: string;
  valid: boolean;
  name: string;
  dropDown(): JSX.Element[]; // Hàm trả về danh sách các option
  dispatcher(name: string, value: string | number | boolean): void; // Hàm để cập nhật giá trị
  data?: string | number | undefined; // Dữ liệu hiện tại
}

export const ValidatedLocationSelector: React.FC<
  ValidatedLocationSelectorProps
> = ({ data, style, valid, name, dropDown, dispatcher }) => {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string | number | undefined>(data); // Khởi tạo giá trị từ props
  const [color, setColor] = useState<string>("gray");

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue); // Cập nhật giá trị local state
    let eName = "";

    // Xác định tên để dispatch
    if (name === "Tỉnh/TP") eName = "province";
    else if (name === "Quận/Huyện") eName = "district";
    else if (name === "Phường/Xã") eName = "ward";

    dispatcher(eName, newValue); // Gọi dispatcher với tên và giá trị mới
  };

  const toggleActive = (e: React.FocusEvent<HTMLSelectElement>) => {
    setActive(!active);
  };

  useEffect(() => {
    setColor(determineValidSelectStyle(active, valid));
  }, [active, valid, value]);

  useEffect(() => {
    setValue(data); // Cập nhật giá trị khi props data thay đổi
  }, [data]);

  return (
    <div className="validated-input">
      <StyledInputBox active={active} valid={valid}>
        <StyledInputLabel color={color} active={true} valid={valid}>
          {name}
          <ExpandMoreRounded
            sx={{
              fontSize: 34,
              color: active ? "#1DA1F2" : "#657786",
              position: "absolute",
              right: "15px",
              top: "35%",
            }}
          />
        </StyledInputLabel>
        <select
          className="validated-input-value validated-date-selector"
          onChange={changeValue}
          onFocus={toggleActive}
          onBlur={toggleActive}
          value={value} // Sử dụng giá trị local state
        >
          {dropDown()}
        </select>
      </StyledInputBox>
    </div>
  );
};
