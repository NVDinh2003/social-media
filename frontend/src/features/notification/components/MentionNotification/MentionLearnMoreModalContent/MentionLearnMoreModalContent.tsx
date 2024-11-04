import React from "react";

import "./MentionLearnMoreModalContent.css";
import { AppDispatch } from "../../../../../redux/Store";
import { useDispatch } from "react-redux";
import { updateDisplayMentionLearnMore } from "../../../../../redux/Slices/ModalSlice";
import BlockSVG from "../../../../../components/SVGs/PostMoreSVG/BlockSVG";
import UntagSVG from "../../../../../components/SVGs/MentionNotiSVG/UntagSVG";
import DoNotNotifySVG from "../../../../../components/SVGs/MentionNotiSVG/DoNotNotifySVG";

export const MentionLearnMoreModalContent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const close = () => {
    dispatch(updateDisplayMentionLearnMore());
  };

  return (
    <div className="mention-learn-more-modal-content">
      <h1 className="mention-learn-more-modal-content-title">
        Let's get you out of this conversation
      </h1>
      <p className="mention-learn-more-modal-content-text">
        Sometime you don't want to engage. Leaving a conversation will ...
      </p>

      <div className="mention-learn-more-modal-content-group">
        <div>
          <UntagSVG width={24} height={24} />
        </div>
        <div className="mention-learn-more-modal-content-group-text">
          <h2 className="mention-learn-more-modal-content-group-heading">
            Untag your username
          </h2>
          Your username stays, but it'll be untagged from the original post and
          all replies.
        </div>
      </div>

      <div className="mention-learn-more-modal-content-group">
        <div>
          <BlockSVG height={24} width={24} />
        </div>
        <div className="mention-learn-more-modal-content-group-text">
          <h2 className="mention-learn-more-modal-content-group-heading">
            Stop future mentions
          </h2>
          People can't mention you again in this conversation
        </div>
      </div>

      <div className="mention-learn-more-modal-content-group">
        <div>
          <DoNotNotifySVG height={24} width={24} />
        </div>
        <div className="mention-learn-more-modal-content-group-text">
          <h2 className="mention-learn-more-modal-content-group-heading">
            Stop notifications
          </h2>
          You won't recieve further notifications, but you can still see the
          conversation.
        </div>
      </div>

      <button
        className="mention-learn-more-modal-content-button"
        onClick={close}
      >
        Got it
      </button>
      <p className="mention-learn-more-modal-content-disclaimer">
        No one will be notified if you leave a conversation.{" "}
        <span className="mention-learn-more-modal-content-underline">
          Learn more
        </span>
      </p>
    </div>
  );
};
