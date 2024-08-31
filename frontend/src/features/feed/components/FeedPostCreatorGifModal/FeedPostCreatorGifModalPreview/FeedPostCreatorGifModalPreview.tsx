import React from "react";
import { FeedPostCreatorFrozenGif } from "../FrozenGifComponent/FeedPostCreatorFrozenGifComponent";
import { TenorCategories } from "../../../../../utils/GlobalInterface";

import "./FeedPostCreatorGifModalPreview.css";

interface FeedPostCreatorGifModalPreviewProps {
  categories: TenorCategories[];
}

export const FeedPostCreatorGifModalPreview: React.FC<
  FeedPostCreatorGifModalPreviewProps
> = ({ categories }) => {
  return (
    <div className="feed-post-creator-gif-modal-preview">
      {categories.map((gif) => (
        <FeedPostCreatorFrozenGif
          key={gif.searchterm}
          image={gif.image}
          text={gif.searchterm}
        />
      ))}
    </div>
  );
};
