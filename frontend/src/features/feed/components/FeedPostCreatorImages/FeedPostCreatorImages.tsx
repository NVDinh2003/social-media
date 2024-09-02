import React, { useMemo } from "react";

import "./FeedPostCreatorImages.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import TagPeopleSVG from "../../../../components/SVGs/TagPeopleSVG";
import ListsSVG from "../../../../components/SVGs/ListsSVG";
import { FeedPostCreatorImage } from "../FeedPostCreatorImage/FeedPostCreatorImage";
import { createImageContainer, displayTagPeople } from "../../utils/FeedUtils";
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

  const toggleTagPeopleModal = () => {
    dispatch(updateDisplayTagPeople());
  };

  const toggleDescriptionModal = () => {
    dispatch(updateDisplayEditPostImage());
  };

  return (
    <div className="feed-post-creator-images">
      {postState.currentPost?.images.length === 0 ? (
        imageContainer
      ) : (
        <div className="feed-post-creator-images-container container-odd">
          <FeedPostCreatorImage
            image={postState.currentPost?.images[0].imageUrl || ""}
            name={postState.currentPost?.images[0].imageName || ""}
            type={"gif"}
          />
        </div>
      )}

      <div className="feed-post-creator-images-options">
        {displayTagPeople(postState, toggleTagPeopleModal)}

        <p
          className="feed-post-creator-images-option"
          onClick={toggleDescriptionModal}
        >
          <ListsSVG height={16} width={16} color={"#536471"} />
          Add Description
        </p>
      </div>
    </div>
  );
};
