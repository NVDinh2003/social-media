import React from "react";

import { displayIcon, iconClass } from "../../utils/RegisterStepUtils";
import "./RegistrationStepCounter.css";

interface RegisterStepProps {
  step: number;
  changeStep(): void;
}

export const RegistrationStepCounter: React.FC<RegisterStepProps> = ({
  step,
  changeStep,
}) => {
  return (
    <div className="reg-step-counter-container">
      <div className={iconClass(step)} onClick={changeStep}>
        {displayIcon(step)}
      </div>
      <span className="reg-step-number">Bước {step}/6</span>
    </div>
  );
};
