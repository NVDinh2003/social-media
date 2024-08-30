import React, { useMemo } from "react";

import "./FeedPostCreatorImages.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import TagPeopleSVG from "../../../../components/SVGs/TagPeopleSVG";
import ListsSVG from "../../../../components/SVGs/ListsSVG";
import { FeedPostCreatorImage } from "../FeedPostCreatorImage/FeedPostCreatorImage";
import { createImageContainer } from "../../utils/FeedUtils";
import {
  updateDisplayEditPostImage,
  updateDisplayTagPeople,
} from "../../../../redux/Slices/ModalSlice";

export const FeedPostCreatorImages: React.FC = () => {
  //
  const postState = useSelector((state: RootState) => state.post);
  // console.log(postState.currentPostImages);

  const dispatch: AppDispatch = useDispatch();

  const imageContainer = useMemo(
    () => createImageContainer(postState.currentPostImages),
    [postState.currentPostImages]
  );

  const toggleTagPeople = () => {
    dispatch(updateDisplayTagPeople());
  };

  const toggleEditImage = () => {
    dispatch(updateDisplayEditPostImage());
  };

  return (
    <div className="feed-post-creator-images">
      {imageContainer}

      <div className="feed-post-creator-images-options">
        <p
          className="feed-post-creator-images-option"
          onClick={toggleTagPeople}
        >
          <TagPeopleSVG height={16} width={16} color={"#536471"} />
          Tag people
        </p>

        <p
          className="feed-post-creator-images-option"
          onClick={toggleEditImage}
        >
          <ListsSVG height={16} width={16} color={"#536471"} />
          Add Description
        </p>
      </div>
    </div>
  );
};
