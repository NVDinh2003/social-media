import React from "react";

import "./Feed.css";
import { FeedTopBar } from "../FeedTopBar/FeedTopBar";

export const Feed: React.FC = () => {
  return (
    <div className="feed">
      <FeedTopBar />
    </div>
  );
};
