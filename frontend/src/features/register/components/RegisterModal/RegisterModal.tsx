import React, { useEffect } from "react";
import { Modal } from "../../../../components/Modal/Modal";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  cleanRegisterState,
  decrementStep,
} from "../../../../redux/Slices/RegisterSlice";
import { RegistrationStepCounter } from "../RegisterStepCounter/RegistrationStepCounter";
import { determineModalContent } from "../../utils/RegisterModalUtils";
import "./RegisterModal.css";
import { useDispatch } from "react-redux";
import { RegisterNextButton } from "../RegisterNextButton/RegisterNextButton";

export const RegisterModal: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDispatch = useDispatch();

  const stepButtonClicked = () => {
    dispatch(decrementStep());
  };

  useEffect(() => {
    return () => {
      dispatch(cleanRegisterState());
    };
  }, []);

  return (
    <Modal
      topContent={
        <RegistrationStepCounter
          step={state.step}
          changeStep={stepButtonClicked}
        />
      }
      content={determineModalContent(state.step)}
      bottomContent={<RegisterNextButton step={state.step} />}
    />
  );
};
