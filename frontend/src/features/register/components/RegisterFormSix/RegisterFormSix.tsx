import React, { ChangeEvent, useState } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/Store";
import { updateUserPassword } from "../../../../redux/Slices/RegisterSlice";

import { useNavigate } from "react-router-dom";

import "./RegisterFormSix.css";

export const RegisterFormSix: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDispatch = useDispatch();

  const [active, setActive] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleView = () => {
    setActive(!active);
  };

  const sendPassword = async () => {
    await dispatch(
      updateUserPassword({
        username: state.username,
        password,
      })
    );

    console.log("navigate");
    navigate("/home");
  };

  return (
    <div className="reg-step-six-container">
      <div className="reg-step-six-content">
        <h1>You'll need a password</h1>
        <p>Make sure it's 8 characters or more.</p>
        <div className="reg-step-six-password">
          <ValidatedTextInput
            valid={true}
            label={"Password"}
            name={"password"}
            changeValue={handleChange}
            attributes={{
              minLength: 8,
              type: active ? "text" : "password",
            }}
          />
        </div>

        <div className="reg-step-six-icon" onClick={toggleView}>
          {active ? (
            <VisibilityOffOutlinedIcon
              sx={{
                fontSize: "24px",
              }}
            />
          ) : (
            <VisibilityOutlinedIcon
              sx={{
                fontSize: "24px",
              }}
            />
          )}
        </div>
      </div>

      <StyledNextButton
        active={password.length >= 8}
        disabled={!(password.length >= 8)}
        onClick={sendPassword}
        color={"black"}
      >
        Next
      </StyledNextButton>
    </div>
  );
};
