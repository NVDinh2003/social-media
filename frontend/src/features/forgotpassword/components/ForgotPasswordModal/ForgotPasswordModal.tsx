import React, { useState } from "react";
import { Modal } from "../../../../components/Modal/Modal";

import { ForgotModalTop } from "../ForgotModalTop/ForgotModalTop";
import { validateEmail, validatePhone } from "../../../../services/Validator";
import axios from "axios";
import {
  determineForgotButton,
  determineForgotFormContent,
} from "../../utils/ForgotPasswordUtils";

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
  const [userInputCode, setUserInputCode] = useState<number>(0);

  const changeCredential = (credential: string) => {
    setCredential(credential);
  };

  const changeUserInputCode = (value: number) => {
    setUserInputCode(value);
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
      content={determineForgotFormContent(
        step,
        setCredential,
        error,
        userInfo.email,
        userInfo.phone,
        !error,
        changeUserInputCode
      )}
      bottomContent={determineForgotButton(
        step,
        credential,
        searchUser,
        toggleModal,
        sendReset
      )}
    />
  );
};
