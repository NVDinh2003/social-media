import styled from "styled-components";
import { StyledNextButtonProps } from "../../../../utils/GlobalInterface";

export const StyledNextButton = styled.button<StyledNextButtonProps>`
  width: 75%;
  height: 52px;
  font-size: 17px;
  color: white;
  background-color: ${(props) =>
    props.color === "blue"
      ? props.theme.colors.blue
      : props.theme.colors.black};

  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
  border-radius: 50px;
  border: none;
  cursor: ${(props) => (props.active ? "pointer" : "auto")};
`;

interface RegisterNextButtonProps {
  step: number;
}

export const RegisterNextButton: React.FC<RegisterNextButtonProps> = ({
  step,
}) => {
  return (
    <StyledNextButton
      disabled={true}
      color={"black"}
      active={false}
      onClick={() => console.log("Hehe")}
    >
      {step}
    </StyledNextButton>
  );
};
