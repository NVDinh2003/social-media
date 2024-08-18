import React from "react";
import { Modal } from "../../../components/Modal/Modal";
import { LoginModalTop } from "../LoginModelTop/LoginModalTop";
import { LoginFormOne } from "../LoginForm/LoginFormOne";

import { RootState } from "../../../redux/Store";
import { useSelector, UseSelector } from "react-redux";

interface LoginModalProps {
  toggleModal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ toggleModal }) => {
  const state = useSelector((state: RootState) => state.user);

  return (
    <Modal
      topContent={<LoginModalTop closeModal={toggleModal} />}
      content={state.username ? <>Login Form 2</> : <LoginFormOne />}
      bottomContent={state.username ? <>Login Form 2 Button</> : <></>}
    />
  );
};
