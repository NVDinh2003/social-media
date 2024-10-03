import React, { createElement, useMemo } from "react";
import { Post } from "../../../../../utils/GlobalInterface";
import { createImagePostContainer } from "../../../../feed/utils/FeedUtils";
import { Reply } from "../../Reply/Reply";
import { convertPostContentToElements } from "../../../utils/PostUtils";

import "./PostContent.css";

export const PostContent: React.FC<{ post: Post; location: string }> = ({
  post,
  location,
}) => {
  const postImageContainer = useMemo(
    () => createImagePostContainer(post.images),
    [post.postId]
  );

  return (
    <div className="post-content">
      <div
        className="post-content-text-wrapper"
        // dangerouslySetInnerHTML={formatTextContent(post.content)}
      >
        {convertPostContentToElements(post.content, location).map(
          (element: JSX.Element, index) => {
            let elementWithKey = createElement(element.type, {
              ...element.props,
              key: index,
            });
            return elementWithKey;
          }
        )}
      </div>
      {post.images.length > 0 && postImageContainer}
      {post.replyTo && typeof post.replyTo !== "number" && (
        <Reply reply={post.replyTo}></Reply>
      )}
    </div>
  );
};
