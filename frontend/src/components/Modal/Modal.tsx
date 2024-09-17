import React from "react";
import { JsxElement } from "typescript";

import "../../assets/global.css";
import "./Modal.css";

interface ModalProps {
  topContent: JSX.Element;
  content: JSX.Element;
  bottomContent: JSX.Element;
  topPosition?: string;
  leftPosition?: string;
  transform?: string;
}

export const Modal: React.FC<ModalProps> = ({
  topContent,
  content,
  bottomContent,
  topPosition,
  leftPosition,
  transform,
}) => {
  return (
    <div className="modal">
      <div
        style={{
          top: topPosition ? topPosition : "50%",
          left: leftPosition ? leftPosition : "50%",
          transform: transform ? transform : `translate(-50%, -50%)`,
        }}
        className="modal-box bg-color"
      >
        <div className="modal-top">{topContent}</div>
        <div className="modal-content">{content}</div>
        <div className="modal-bottom">{bottomContent}</div>
      </div>
    </div>
  );
};
