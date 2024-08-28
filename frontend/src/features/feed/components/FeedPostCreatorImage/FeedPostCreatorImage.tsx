import React from "react";

import "./FeedPostCreatorImage.css";

interface FeedPostCreatorImageProps {
  image: string;
}

export const FeedPostCreatorImage: React.FC<FeedPostCreatorImageProps> = ({
  image,
}) => {
  return (
    <div
      className="feed-post-creator-image"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};
