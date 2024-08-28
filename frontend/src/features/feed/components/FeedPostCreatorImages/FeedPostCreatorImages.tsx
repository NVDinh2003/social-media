import React from "react";

import "./FeedPostCreatorImages.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import TagPeopleSVG from "../../../../components/SVGs/TagPeopleSVG";
import ListsSVG from "../../../../components/SVGs/ListsSVG";
import { FeedPostCreatorImage } from "../FeedPostCreatorImage/FeedPostCreatorImage";
import { createImageContainer } from "../../utils/FeedUtils";

export const FeedPostCreatorImages: React.FC = () => {
  //
  const postState = useSelector((state: RootState) => state.post);

  return (
    <div className="feed-post-creator-images">
      {createImageContainer(postState.currentPostImages)}

      <div className="feed-post-creator-images-options">
        <p className="feed-post-creator-images-option">
          <TagPeopleSVG height={16} width={16} color={"#536471"} />
          Tag people
        </p>

        <p className="feed-post-creator-images-option">
          <ListsSVG height={16} width={16} color={"#536471"} />
          Add Description
        </p>
      </div>
    </div>
  );
};
