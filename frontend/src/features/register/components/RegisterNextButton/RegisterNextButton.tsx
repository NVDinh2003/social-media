import styled from "styled-components";
import { StyledNextButtonProps } from "../../../../utils/GlobalInterface";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementStep,
  registerUser,
} from "../../../../redux/Slices/RegisterSlice";
import { register } from "module";
import { cleanDateForRequest } from "../../utils/DateUtils";

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
  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDispatch = useDispatch();
  //
  const nextStep = () => {
    dispatch(incrementStep());
  };

  const sendUserInfo = () => {
    const user = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      dob: cleanDateForRequest(state.dob),
    };

    dispatch(registerUser(user));
  };

  const determineButtonContent = (step: number): JSX.Element => {
    // console.log("rendering the button");
    switch (step) {
      case 1:
        let active =
          state.dobValid &&
          state.emailValid &&
          state.firstNameValid &&
          state.lastNameValid;

        return (
          <StyledNextButton
            disabled={!active}
            color={"black"}
            active={active}
            onClick={nextStep}
          >
            Next
          </StyledNextButton>
        );

      case 2:
        return (
          <StyledNextButton active={true} color={"black"} onClick={nextStep}>
            Next step
          </StyledNextButton>
        );

      case 3:
        return (
          <StyledNextButton onClick={sendUserInfo} color={"blue"} active={true}>
            Sign up
          </StyledNextButton>
        );
      default:
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
    }
  };

  return determineButtonContent(step);
};
