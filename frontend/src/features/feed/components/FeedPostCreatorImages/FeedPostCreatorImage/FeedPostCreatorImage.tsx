import React from "react";

import "./FeedPostCreatorImage.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/Store";
import {
  updateCurrentPost,
  updateCurrentPostImages,
} from "../../../../../redux/Slices/PostSlice";
import { updateDisplayEditPostImage } from "../../../../../redux/Slices/ModalSlice";

interface FeedPostCreatorImageProps {
  image: string;
  name: string;
  type: string;
  displayCloseIcon: boolean;
}

export const FeedPostCreatorImage: React.FC<FeedPostCreatorImageProps> = ({
  image,
  name,
  type,
  displayCloseIcon,
}) => {
  const state = useSelector((state: RootState) => state.post);

  const dispatch: AppDispatch = useDispatch();

  const removeImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (
      (state.currentPost && state.currentPost.images.length > 0) ||
      (state.currentReply && state.currentReply?.images.length > 0)
    ) {
      dispatch(
        updateCurrentPost({
          name: "images",
          value: [],
        })
      );
    } else {
      let filteredImages: File[] = state.currentPostImages.filter(
        (img: any) => img.name !== name
      );

      dispatch(updateCurrentPostImages(filteredImages));
    }
  };

  const editImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(updateDisplayEditPostImage());
  };

  return (
    <div
      className="feed-post-creator-image"
      style={{ backgroundImage: `url(${image})` }}
      onClick={editImage}
    >
      {displayCloseIcon && (
        <div className="feed-post-creator-image-clear" onClick={removeImage}>
          <CloseIcon
            sx={{
              fontSize: "18px",
              color: "white",
            }}
          />
        </div>
      )}
      {type === "image/gif" || "gif" ? (
        <></>
      ) : (
        <div className="feed-post-creator-image-edit" onClick={editImage}>
          Edit
        </div>
      )}
    </div>
  );
};
