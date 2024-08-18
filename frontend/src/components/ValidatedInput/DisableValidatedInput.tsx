import React from "react";

import { StyledInputBox, StyledInputLabel } from "./StyledInput";
import "./ValidatedInput.css";

interface DisableValidatedInputProps {
  label: string;
  value: string;
}

export const DisableValidatedInput: React.FC<DisableValidatedInputProps> = ({
  label,
  value,
}) => {
  return (
    <div className="disabled-validated-input">
      <StyledInputBox active={false} valid={true}>
        <StyledInputLabel color={"gray"} active={true} valid={true}>
          {label}
        </StyledInputLabel>
        <input
          className="validated-input-value validated-input-text-transparent"
          type="text"
          value={value}
          disabled
        />
      </StyledInputBox>
    </div>
  );
};
