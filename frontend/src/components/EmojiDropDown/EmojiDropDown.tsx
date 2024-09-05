import React, { useEffect } from "react";
import { generateSmileysAndPeople } from "../../utils/EmojiUtils";

export const EmojiDropDown: React.FC = () => {
  //
  useEffect(() => {
    generateSmileysAndPeople();
  }, []);

  return;
};
