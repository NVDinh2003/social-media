import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  StyledInputBox,
  StyledInputLabel,
} from "../ValidatedInput/StyledInput";

import "../ValidatedInput/ValidatedInput.css";

interface DropDownProps {
  content(): JSX.Element[];
  change(e: React.ChangeEvent<HTMLSelectElement>): void;
  label: string;
  defaultValue: string | number;
}

export const DropDown: React.FC<DropDownProps> = ({
  content,
  change,
  label,
  defaultValue,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [data, setData] = useState<string>("");

  const toggleSelect = () => {
    setActive(!active);
  };

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData(e.target.value);
    change(e);
  };

  return (
    <div className="dropdown-container">
      <StyledInputBox active={active} valid={true}>
        <StyledInputLabel
          color={active ? "blue" : "gray"}
          active={true}
          valid={true}
        >
          <ExpandMoreRoundedIcon
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
          onChange={changeValue}
          onFocus={toggleSelect}
          onBlur={toggleSelect}
          value={data ? data : defaultValue}
          className="validated-input-value validated-date-selector"
        >
          {content()}
        </select>
      </StyledInputBox>
    </div>
  );
};
