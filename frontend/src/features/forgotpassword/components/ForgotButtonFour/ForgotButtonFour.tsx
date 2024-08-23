import React from "react";
import { ModalButton } from "../../../../components/ModalButton/ModalButton";

import "./ForgotButtonFour.css";

interface ForgotButtonFourProps {
  submitNewPassword: () => void;
  active: boolean;
}

export const ForgotButtonFour: React.FC<ForgotButtonFourProps> = ({
  submitNewPassword,
  active,
}) => {
  return (
    <div className="forgot-button-four">
      <ModalButton
        active={active}
        height={50}
        fontColor={"white"}
        backgroundColor={active ? "black" : "rgba(0,0,0,0.7)"}
        fontSize={17}
        fontWeight={700}
        hoverBackground={{ r: 0, g: 0, b: 0, a: 0.9 }}
        onClick={submitNewPassword}
      >
        Change password
      </ModalButton>
    </div>
  );
};
