import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/Modal/Modal";
import { LoginModalTop } from "../LoginModelTop/LoginModalTop";
import { LoginFormOne } from "../LoginForm/LoginFormOne";

import { LoginButton } from "../LoginButton/LoginButton";

import { RootState } from "../../../redux/Store";
import { useSelector, UseSelector } from "react-redux";
import { LoginFormTwo } from "../LoginForm/LoginFormTwo";

interface LoginModalProps {
  toggleModal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ toggleModal }) => {
  //
  const state = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (state.loggedIn) {
      navigate("/home");
      return () => {};
    }
  });

  return (
    <Modal
      topContent={<LoginModalTop closeModal={toggleModal} />}
      content={
        state.username ? (
          <LoginFormTwo setPassword={handlePassword} />
        ) : (
          <LoginFormOne />
        )
      }
      bottomContent={
        state.username ? (
          <LoginButton username={state.username} password={password} />
        ) : (
          <></>
        )
      }
    />
  );
};
