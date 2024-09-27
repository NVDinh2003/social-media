import React, { useMemo } from "react";
import { Post } from "../../../../../utils/GlobalInterface";
import { createImagePostContainer } from "../../../../feed/utils/FeedUtils";
import { Reply } from "../../Reply/Reply";
import { formatTextContent } from "../../../utils/PostUtils";

import "./PostContent.css";

export const PostContent: React.FC<{ post: Post }> = ({ post }) => {
  const postImageContainer = useMemo(
    () => createImagePostContainer(post.images),
    [post.postId]
  );

  return (
    <div className="post-content">
      {/* <div className="post-content">
    {" "}
    {post.content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))}
  </div> */}
      <div
        className="post-content-text-wrapper"
        dangerouslySetInnerHTML={formatTextContent(post.content)}
      />
      {post.images.length > 0 && postImageContainer}
      {post.replyTo && typeof post.replyTo !== "number" && (
        <Reply reply={post.replyTo}></Reply>
      )}
    </div>
  );
};
