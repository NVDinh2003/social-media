import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import "./CreateReplyTop.css";
import { AppDispatch } from "../../../../../redux/Store";
import { useDispatch } from "react-redux";
import { updateDisplayCreateReply } from "../../../../../redux/Slices/ModalSlice";
import { setCurrentPost } from "../../../../../redux/Slices/FeedSlice";

export const CreateReplyTop: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const toggleReply = () => {
    // when closed, reset
    dispatch(setCurrentPost(undefined));
    dispatch(updateDisplayCreateReply());
  };

  return (
    <div className="create-reply-top">
      <div className="create-reply-top-bottom-bg" onClick={toggleReply}>
        <CloseIcon
          sx={{
            height: "20px",
            width: "20px",
          }}
        />
      </div>

      <div className="create-reply-top-drafts-bg">Drafts</div>
    </div>
  );
};
