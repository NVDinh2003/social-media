import React from "react";
import { Modal } from "../../../../components/Modal/Modal";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { decrementStep } from "../../../../redux/Slices/RegisterSlice";
import { RegistrationStepCounter } from "../RegisterStepCounter/RegistrationStepCounter";
import { determineModalContent } from "../../utils/RegisterModalUtils";
import "./RegisterModal.css";
import { useDispatch } from "react-redux";

export const RegisterModal: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDispatch = useDispatch();

  const stepButtonClicked = () => {
    dispatch(decrementStep());
  };

  return (
    <Modal
      topContent={<div>Top</div>}
      content={<div>Content</div>}
      bottomContent={<div>Bottom</div>}
    />
    // <Modal>
    //   <div className="register-container">
    //     <RegistrationStepCounter
    //       step={state.step}
    //       changeStep={stepButtonClicked}
    //     />
    //     <div className="register-modal-content">
    //       {
    //         /* swap components based on  the step!  */
    //         determineModalContent(state.step)
    //       }
    //     </div>
    //   </div>
    // </Modal>
  );
};
