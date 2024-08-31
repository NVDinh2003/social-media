import React, { useRef } from "react";

import "./FeedPostCreatorGifModalDisplay.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/Store";

interface FeedPostCreatorGifModalDisplayProps {
  gifs: string[];
}

export const FeedPostCreatorGifModalDisplay: React.FC<
  FeedPostCreatorGifModalDisplayProps
> = ({ gifs }) => {
  //
  const state = useSelector((state: RootState) => state.gif);
  const hiddenDiv = useRef<HTMLDivElement>(null);

  return (
    <div className="feed-post-creator-gif-modal-display">
      <div className="feed-post-creator-gif-modal-display-auto-selection">
        <p className="feed-post-creator-gif-modal-display-auto-text">
          Auto-play GIFs
        </p>

        <div className="feed-post-creator-gif-modal-display-auto-toggle"></div>
      </div>

      <div className="feed-post-creator-gif-modal-display-gif-container">
        {gifs.map((gif) => (
          <img
            className="feed-post-creator-gif-modal-display-gif"
            key={gif}
            src={gif}
          />
        ))}
      </div>

      <div id="autoload" ref={hiddenDiv} hidden={state.gifs.length === 0}></div>
    </div>
  );
};
