import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import { countryCodeDropDown } from "../../utils/RegisterModalUtils";
import { validatePhone } from "../../../../services/Validator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import "./RegisterFormFour.css";

export const RegisterFormFour: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);

  const [phoneCode, setPhoneCode] = useState<string>("+1");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [validNumber, setValidNumber] = useState<boolean>(true);

  const dispatch: AppDispatch = useDispatch();

  const changeCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneCode(e.target.value.split(" ")[0]);
  };

  const changePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    dispatch(
      updateRegister({
        name: "phoneNumber",
        value: e.target.value,
      })
    );
  };

  useEffect(() => {
    if (phoneNumber) {
      setValidNumber(validatePhone(phoneNumber));
      dispatch(
        updateRegister({
          name: "phoneNumberValid",
          value: validatePhone(phoneNumber),
        })
      );
    }
  }, [phoneCode, phoneNumber]);

  return (
    <div className="reg-step-four-container">
      <div className="reg-step-four-content">
        <h1>Add a phone number</h1>
        <p className="reg-step-four-subhead">
          Enter the phone number you would like to associate with your Fwitter
          account. You won't get a verification code sent here.
        </p>

        <div className="reg-step-four-input">
          <DropDown
            content={countryCodeDropDown}
            change={changeCode}
            label={"Country code"}
            defaultValue={"United States +1"}
          />
          <ValidatedTextInput
            valid={true}
            name={"phoneNumber"}
            label={"Your phone number"}
            changeValue={changePhoneNumber}
          />
          {validNumber ? (
            <></>
          ) : (
            <p className="reg-step-four-invalid">
              Please enter a valid 10 digit number
            </p>
          )}
        </div>

        <div className="reg-step-four-check-group">
          <p>
            Let people who have your phone number find and connect with you on
            Fwitter. <span className="reg-step-four-link">Learn more</span>.
          </p>
          <Checkbox />
        </div>

        <div className="reg-step-four-check-group">
          <p>
            Let Fwitter use your phone number to personalize our service,
            including ads (if permitted by Ads preference). If you don't enable
            this, Fwitter will still use your phone number for purpose including
            account security, spam, fraud, and abuse prevention.{" "}
            <span className="reg-step-four-link">
              See our Privacy Policy for more information.
            </span>
          </p>
          <Checkbox />
        </div>
      </div>
    </div>
  );
};
