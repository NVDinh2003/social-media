import Close from "@mui/icons-material/Close";
import React from "react";
import "./LocationModalTopBar.css";
import { AppDispatch } from "../../../../../redux/Store";
import { useDispatch } from "react-redux";
import { updateDisplayLocation } from "../../../../../redux/Slices/ModalSlice";

interface LocationModalTopBarProps {
  onConfirm: () => void;
}

export const LocationModalTopBar: React.FC<LocationModalTopBarProps> = ({
  onConfirm,
}) => {
  const dispatch: AppDispatch = useDispatch();
  function closeModal() {
    dispatch(updateDisplayLocation());
  }

  return (
    <div className="location-post-modal-top-bar">
      <div className="location-post-modal-top-bar-left">
        <div
          className="location-post-modal-top-bar-close-bg"
          onClick={closeModal}
        >
          <Close
            sx={{
              height: "20px",
              width: "20px",
            }}
          />
          {/* <p className="location-post-modal-top-bar-text"></p> */}
        </div>
      </div>

      <div className="location-post-modal-top-bar-right">
        <button
          className="location-post-modal-top-bar-confirm"
          onClick={() => {
            onConfirm();
            closeModal();
          }}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};
