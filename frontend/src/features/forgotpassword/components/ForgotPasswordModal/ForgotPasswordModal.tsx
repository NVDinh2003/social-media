import React, { useState } from "react";
import { Modal } from "../../../../components/Modal/Modal";

import { ForgotModalTop } from "../ForgotModalTop/ForgotModalTop";
import { validateEmail, validatePhone } from "../../../../services/Validator";
import { ForgotFormOne } from "../ForgotForm/ForgotFormOne";
import { ForgotButtonOne } from "../ForgotButtonOne/ForgotButtonOne";
import { ForgotFormTwo } from "../ForgotForm/ForgotFormTwo";
import { ForgotButtonTwo } from "../ForgotButtonTwo/ForgotButtonTwo";
import axios from "axios";

interface UserInfo {
  email: string;
  phone: string;
  username: string;
}

export const ForgotPasswordModal: React.FC<{ toggleModal: () => void }> = ({
  toggleModal,
}) => {
  //
  const [credential, setCredential] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    phone: "",
    username: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [resetCode, setResetCode] = useState<number>(0);

  const changeCredential = (credential: string) => {
    setCredential(credential);
  };

  const searchUser = async () => {
    let findUserDTO = {
      email: "",
      phone: "",
      username: "",
    };

    if (validateEmail(credential)) {
      findUserDTO = {
        ...findUserDTO,
        email: credential,
      };
    } else if (validatePhone(credential)) {
      findUserDTO = {
        ...findUserDTO,
        phone: credential,
      };
    } else {
      findUserDTO = {
        ...findUserDTO,
        username: credential,
      };
    }

    try {
      setError(false);
      let res = await axios.post(
        "http://localhost:8000/auth/identifiers",
        findUserDTO
      );
      let data = await res.data;
      setUserInfo({
        email: data.email,
        phone: data.phone,
        username: data.username,
      });
      console.log(data);
      setStep(2);
    } catch (e) {
      setError(true);
    }
  };

  const sendReset = async () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setResetCode(code);

    try {
      let req = await axios.post("http://localhost:8000/auth/password/code", {
        email: userInfo.email,
        code,
      });

      let res = await req.data;
      console.log(code);
      setStep(3);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      topContent={<ForgotModalTop closeModal={toggleModal} />}
      content={
        step === 1 ? (
          <ForgotFormOne setCredential={changeCredential} error={error} />
        ) : (
          <ForgotFormTwo email={userInfo.email} phone={userInfo.phone} />
        )
      }
      bottomContent={
        step === 1 ? (
          <ForgotButtonOne value={credential} handleClick={searchUser} />
        ) : (
          <ForgotButtonTwo onCancel={toggleModal} sendCode={sendReset} />
        )
      }
    />
  );
};
