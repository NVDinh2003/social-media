import React from "react";

import "./FeedPostCreatorImage.css";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateCurrentPostImages } from "../../../../redux/Slices/PostSlice";

interface FeedPostCreatorImageProps {
  image: string;
}

export const FeedPostCreatorImage: React.FC<FeedPostCreatorImageProps> = ({
  image,
}) => {
  //
  const state = useSelector((state: RootState) => state.post);
  const dispatch: AppDispatch = useDispatch();

  const removeImage = () => {
    let imageArrayCoppy: string[] = JSON.parse(
      JSON.stringify(state.currentPostImages)
    );

    imageArrayCoppy = imageArrayCoppy.filter((img) => img !== image);

    dispatch(updateCurrentPostImages(imageArrayCoppy));
  };

  return (
    <div
      className="feed-post-creator-image"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="feed-post-creator-image-clear" onClick={removeImage}>
        <Close
          sx={{
            fontSize: "18px",
            color: "white",
          }}
        />
      </div>

      <div className="feed-post-creator-image-edit" onClick={() => {}}>
        Edit
      </div>
    </div>
  );
};
