import React from "react";
import { Modal } from "../../../components/Modal/Modal";
import { LoginModalTop } from "../LoginModelTop/LoginModalTop";
import { LoginFormOne } from "../LoginForm/LoginFormOne";

interface LoginModalProps {
  toggleModal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ toggleModal }) => {
  return (
    <Modal
      topContent={<LoginModalTop closeModal={toggleModal} />}
      content={<LoginFormOne />}
      bottomContent={<div>Login bottom</div>}
    />
  );
};
