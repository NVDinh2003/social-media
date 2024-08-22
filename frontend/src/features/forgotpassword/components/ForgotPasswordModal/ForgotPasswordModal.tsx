import React, { useState } from "react";
import { Modal } from "../../../../components/Modal/Modal";

import { ForgotModalTop } from "../ForgotModalTop/ForgotModalTop";
import { ForgotFormOne } from "../ForgotForm/ForgotFormOne";
import { validateEmail, validatePhone } from "../../../../services/Validator";
import { ForgotButtonOne } from "../ForgotButtonOne/ForgotButtonOne";
import { ForgotFormTwo } from "../ForgotForm/ForgotFormTwo";
import axios from "axios";

export const ForgotPasswordModal: React.FC<{ toggleModal: () => void }> = ({
  toggleModal,
}) => {
  //
  const [credential, setCredential] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

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
        "http://localhost:8000/auth/find",
        findUserDTO
      );
      let data = await res.data;
      console.log(data);
      setStep(2);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Modal
      topContent={<ForgotModalTop closeModal={toggleModal} />}
      content={
        step === 1 ? (
          <ForgotFormOne setCredential={changeCredential} error={error} />
        ) : (
          <ForgotFormTwo />
        )
      }
      bottomContent={
        step === 1 ? (
          <ForgotButtonOne value={credential} handleClick={searchUser} />
        ) : (
          <>Step two button</>
        )
      }
    />
  );
};
