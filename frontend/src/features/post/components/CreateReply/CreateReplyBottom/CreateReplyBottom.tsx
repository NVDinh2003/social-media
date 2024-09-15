import React from "react";

import "./CreateReplyBottom.css";
import { CreatePostButtonCluster } from "../../CreatePostButtonCluster/CreatePostButtonCluster";

export const CreateReplyBottom = () => {
  return (
    <div className="create-reply-bottom">
      <CreatePostButtonCluster />

      <button className="create-reply-bottom">Reply</button>
    </div>
  );
};
