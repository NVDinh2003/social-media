import React, { useEffect, useRef } from "react";

import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";

import "./ForgotRadioButton.css";

interface StyledRadioButtonProps {
  clicked: boolean;
}

export const StyledRadio = styled.input<StyledRadioButtonProps>`
  -webkit-appearance: none;
  appearance: none;
  background-color: #ffffff;
  margin: 0;
  color: white;
  width: 20px;
  height: 20px;
  border: ${(props) =>
    props.clicked ? "none" : `2px solid ${props.theme.colors.darkGray}`};
  border-radius: 50%;
  &:checked {
    background-color: ${(props) => props.theme.colors.blue};
  }
`;

export const StyledRadioDiv = styled.div<StyledRadioButtonProps>`
  height: 36px;
  width: 36px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  &:hover {
    background-color: ${(props) =>
      props.clicked ? "rgba(29,155,249,0.1)" : "rgba(83,100,113,0.1)"};
  }
`;

interface ForgotRadioButtonProps {
  clicked: boolean;
  handleClick: () => void;
}

export const ForgotRadioButton: React.FC<ForgotRadioButtonProps> = ({
  clicked,
  handleClick,
}) => {
  //
  const radio = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (radio.current) {
      radio.current.checked = clicked;
    }
  }, [clicked]);
  //
  return (
    <StyledRadioDiv clicked={clicked} onClick={handleClick}>
      <StyledRadio type="radio" clicked={clicked} ref={radio}></StyledRadio>
      <div className="forgot-radio-checkmark">
        {clicked ? (
          <CheckIcon
            sx={{
              color: "white",
              fontSize: "14px",
              fontWeight: 300,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </StyledRadioDiv>
  );
};
