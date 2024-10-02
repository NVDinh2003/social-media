import React, { useState } from "react";

import "./FeedPostReplyRestrictionDropDown.css";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { getReplyDropDownButton } from "../../utils/FeedUtils";

import PeopleYouFollowSVG from "../../../../components/SVGs/PeopleYouFollowSVG";
import MentionedSVG from "../../../../components/SVGs/MentionedSVG";
import { updateCurrentPost } from "../../../../redux/Slices/PostSlice";
import { Check } from "@mui/icons-material";

export const FeedPostReplyRestrictionDropDown: React.FC = () => {
  //
  const state = useSelector((state: RootState) => state.post);
  const dispatch: AppDispatch = useDispatch();

  const [active, setActive] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("Everyone");

  const handleOpenModal = () => {
    setActive(!active);
  };

  const handleChangeSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelection(e.currentTarget.id);

    dispatch(
      updateCurrentPost({
        name: "replyRestriction",
        value: e.currentTarget.id.toUpperCase(),
      })
    );
    setActive(false);
  };

  //   console.log(active);

  return (
    <div className={"feed-post-reply-restriction-drop-down"}>
      {getReplyDropDownButton(state, handleOpenModal)}

      <div
        className="feed-post-reply-restriction-drop-down-modal"
        style={{ display: active ? "block" : "none" }}
      >
        <h2 className="feed-post-reply-restriction-drop-down-title">
          Who can reply?
        </h2>
        <p className="feed-post-reply-restriction-drop-down-sub-title">
          Choose who can reply to the post
        </p>
        <p className="feed-post-reply-restriction-drop-down-sub-title">
          Any mentioned can always reply
        </p>
        <div
          id="Everyone"
          className="feed-post-reply-restriction-drop-down-choice"
          onClick={handleChangeSelection}
        >
          <div className="feed-post-creator-reply-restriction-drop-down-choice-left">
            <div className="feed-post-creator-reply-restriction-drop-down-choice-bg">
              <GlobeSVG height={20} width={20} color={"#fff"} />
            </div>

            <p className="feed-post-creator-reply-restriction-drop-down-choice-text">
              Everyone
            </p>
          </div>

          {selection === "Everyone" ? (
            <Check
              sx={{
                color: "#1da1f2",
                fontSize: "18px",
              }}
            />
          ) : (
            <></>
          )}
        </div>

        <div
          id="Follow"
          className="feed-post-reply-restriction-drop-down-choice"
          onClick={handleChangeSelection}
        >
          <div className="feed-post-creator-reply-restriction-drop-down-choice-left">
            <div className="feed-post-creator-reply-restriction-drop-down-choice-bg">
              <PeopleYouFollowSVG height={20} width={20} color={"#fff"} />
            </div>

            <p className="feed-post-creator-reply-restriction-drop-down-choice-text">
              People you follow
            </p>
          </div>

          {selection === "Follow" ? (
            <Check
              sx={{
                color: "#1da1f2",
                fontSize: "18px",
              }}
            />
          ) : (
            <></>
          )}
        </div>

        <div
          id="Mention"
          className="feed-post-reply-restriction-drop-down-choice"
          onClick={handleChangeSelection}
        >
          <div className="feed-post-creator-reply-restriction-drop-down-choice-left">
            <div className="feed-post-creator-reply-restriction-drop-down-choice-bg">
              <MentionedSVG height={20} width={20} color={"#fff"} />
            </div>

            <p className="feed-post-creator-reply-restriction-drop-down-choice-text">
              Only people you mentioned
            </p>
          </div>

          {selection === "Mention" ? (
            <Check
              sx={{
                color: "#1da1f2",
                fontSize: "18px",
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
