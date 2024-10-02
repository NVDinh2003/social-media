import React from "react";

import "./NotificationPostContent.css";
import { Post } from "../../../../utils/GlobalInterface";

export const NotificationPostContent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="notification-post-content">
      <div className="notification-post-content-overflow-container">
        {/* {convertPostContentToElementForNotifications(post.content)} */}
        {post.content}
      </div>

      {post.images.length > 0 && (
        <span className="notification-post-content-pic">{`pic.twitter.com/${post.postId}`}</span>
      )}
    </div>
  );
};
