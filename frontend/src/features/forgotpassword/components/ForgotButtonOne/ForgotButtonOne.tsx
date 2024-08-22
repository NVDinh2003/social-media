import React from "react";
import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import "./ForgotButtonOne.css";

interface ForgtoButtonOneProps {
  value: string;
  handleClick: () => void;
}

export const ForgotButtonOne: React.FC<ForgtoButtonOneProps> = ({
  value,
  handleClick,
}) => {
  return (
    <div className="forgot-button-one">
      <ModalButton
        active={value ? true : false}
        height={50}
        fontColor={"white"}
        backgroundColor={value ? "black" : "rgba(0,0,0,.8)"}
        fontSize={17}
        fontWeight={700}
        hoverBackground={{ r: 0, g: 0, b: 0, a: 0.8 }}
        onClick={handleClick}
      >
        Next
      </ModalButton>
    </div>
  );
};
