import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import "./SchedulePostModalTopBar.css";
import { AppDispatch } from "../../../redux/Store";
import { useDispatch } from "react-redux";
import { updateDisplaySchedule } from "../../../redux/Slices/ModalSlice";

export const SchedulePostModalTopBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  function closeModal() {
    dispatch(updateDisplaySchedule());
  }

  return (
    <div className="schedule-post-modal-top-bar">
      <div className="schedule-post-modal-top-bar-left">
        <div
          className="schedule-post-modal-top-bar-close-bg"
          onClick={closeModal}
        >
          <CloseIcon
            sx={{
              width: "20px",
              height: "20px",
            }}
          />
        </div>
        <p className="schedule-post-modal-top-bar-text">Schedule</p>
      </div>

      <div className="schedule-post-modal-top-bar-right">
        <button
          className="schedule-post-modal-top-bar-confirm"
          onClick={() => {}}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
