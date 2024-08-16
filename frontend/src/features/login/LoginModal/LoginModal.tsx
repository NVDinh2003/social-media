import React from "react";
import { Modal } from "../../../components/Modal/Modal";
import { LoginModalTop } from "../LoginModelTop/LoginModalTop";

interface LoginModalProps {
  toggleModal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ toggleModal }) => {
  return (
    <Modal
      topContent={<LoginModalTop closeModal={toggleModal} />}
      content={<div>Login content</div>}
      bottomContent={<div>Login bottom</div>}
    />
  );
};
