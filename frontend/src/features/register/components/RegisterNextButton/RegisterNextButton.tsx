import styled from "styled-components";
import { StyledNextButtonProps } from "../../../../utils/GlobalInterface";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementStep,
  registerUser,
  sendVerification,
  updateUserPassword,
  updateUserPhone,
} from "../../../../redux/Slices/RegisterSlice";
import { cleanDateForRequest } from "../../../../utils/DateUtils";

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

  const sendPhoneNumber = () => {
    dispatch(
      updateUserPhone({
        username: state.username,
        phone: state.phoneNumber,
      })
    );
  };

  const verifyEmail = () => {
    dispatch(
      sendVerification({
        username: state.username,
        code: state.code,
      })
    );
  };

  const sendPassword = () => {
    dispatch(
      updateUserPassword({
        username: state.username,
        password: state.password,
      })
    );
  };

  const determineButtonContent = (step: number): JSX.Element => {
    // console.log("rendering the button");
    switch (step) {
      case 1:
        let stepOneActive =
          state.dobValid &&
          state.emailValid &&
          state.firstNameValid &&
          state.lastNameValid;

        return (
          <StyledNextButton
            disabled={!stepOneActive}
            color={"black"}
            active={stepOneActive}
            onClick={nextStep}
          >
            Tiếp
          </StyledNextButton>
        );

      case 2:
        return (
          <StyledNextButton active={true} color={"black"} onClick={nextStep}>
            Tiếp tục
          </StyledNextButton>
        );

      case 3:
        return (
          <StyledNextButton onClick={sendUserInfo} color={"blue"} active={true}>
            Đăng ký
          </StyledNextButton>
        );

      case 4:
        let stepFourActive =
          state.phoneNumber && state.phoneNumberValid ? true : false;
        return (
          <StyledNextButton
            disabled={!stepFourActive}
            color={"black"}
            active={stepFourActive}
            onClick={sendPhoneNumber}
          >
            Update number
          </StyledNextButton>
        );

      case 5:
        let stepFiveActive = state.code ? true : false;
        return (
          <StyledNextButton
            active={stepFiveActive}
            disabled={!stepFiveActive}
            color={"black"}
            onClick={verifyEmail}
          >
            Next
          </StyledNextButton>
        );

      case 6:
        return (
          <StyledNextButton
            active={state.password.length >= 8}
            disabled={!(state.password.length >= 8)}
            onClick={sendPassword}
            color={"black"}
          >
            Next
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
