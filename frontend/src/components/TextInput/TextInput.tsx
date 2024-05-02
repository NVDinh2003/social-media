import React, { useState, useEffect } from "react";
interface TextInputProps {
  name: string;
  lable: string;
  errorMessage: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  maxLength?: number;
  validator?(value: string): boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  lable,
  errorMessage,
  onChange,
  maxLength,
  validator,
}) => {
  const [inputValue, setInputValue] = useState<String>("");
  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setInputValue(e.target.value);
  };

  return (
    <div className="text-input">
      <div>
        <span>{lable}</span>
        <input name={name} onChange={updateInput} />
      </div>
    </div>
  );
};
