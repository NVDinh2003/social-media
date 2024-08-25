import React, { useState } from "react";

import "./FeedTopBar.css";

export const FeedTopBar: React.FC = () => {
  //
  const [forYouActive, setForYouActive] = useState<boolean>(true);
  const [followingActive, setFollowingActive] = useState<boolean>(false);

  const selectChoice = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "for-you") {
      setFollowingActive(false);
      setForYouActive(true);
    } else {
      setForYouActive(false);
      setFollowingActive(true);
    }
  };

  return (
    <div className="feed-top-bar">
      <div className="feed-top-bar-top">
        <h1 className="feed-top-bar-home">Home</h1>
      </div>

      <div className="feed-top-bar-bottom">
        <div
          className="feed-top-bar-choice"
          id="for-you"
          onClick={selectChoice}
        >
          <div className="feed-top-bar-choice-content">
            <h2
              className={`${
                forYouActive
                  ? "feed-top-bar-choice-text-active"
                  : "feed-top-bar-choice-text"
              }`}
            >
              For you
            </h2>

            {forYouActive ? (
              <div className="feed-top-bar-choice-underline"></div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div
          className="feed-top-bar-choice"
          id="following"
          onClick={selectChoice}
        >
          <div className="feed-top-bar-choice-content">
            <h2
              className={`${
                followingActive
                  ? "feed-top-bar-choice-text-active"
                  : "feed-top-bar-choice-text"
              }`}
            >
              Following
            </h2>

            {followingActive ? (
              <div className="feed-top-bar-choice-underline"></div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
