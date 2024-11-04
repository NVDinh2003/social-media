import React from "react";

import "./MentionLearnMoreModalTop.css";
import { AppDispatch } from "../../../../../redux/Store";
import { useDispatch } from "react-redux";
import { updateDisplayMentionLearnMore } from "../../../../../redux/Slices/ModalSlice";
import Close from "@mui/icons-material/Close";

export const MentionLearnMoreModalTop: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const close = () => {
    dispatch(updateDisplayMentionLearnMore());
  };

  return (
    <div className="mention-learn-more-modal-top">
      <div className="mention-learn-more-modal-top-exit" onClick={close}>
        <Close sx={{ height: "20px", width: "20px" }} />
      </div>
    </div>
  );
};
