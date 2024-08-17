import styled from "styled-components";
import { ModalButtonProps } from "../../utils/GlobalInterface";

export const ModalButton = styled.button<ModalButtonProps>`
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  padding: 12px;
  color: ${(props) => props.fontColor};
  border: ${(props) =>
    props.borderColor ? `solid 1px ${props.borderColor}` : "none"};
  background-color: ${(props) => props.backgroundColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => `${props.fontSize}px`};
  &:hover {
    cursor: pointer;
    background-color: ${(
      props
    ) => `rgba(${props.hoverBackground.r}, ${props.hoverBackground.g}, ${props.hoverBackground.b}
        , ${props.hoverBackground.a})`};
    border: ${(props) =>
      props.hoverBorder
        ? `solid 1px rgba(${props.hoverBorder.r}, ${props.hoverBorder.g}, ${props.hoverBorder.b}, ${props.hoverBorder.a})`
        : "none"};
  }
`;
