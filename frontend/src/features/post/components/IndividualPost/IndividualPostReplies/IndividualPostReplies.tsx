import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/Store";
import { Post } from "../../Post/Post";

export const IndividualPostReplies: React.FC = () => {
  const replies = useSelector((state: RootState) => state.feed.posts.slice(1));

  return (
    <>
      {replies.map((post) => (
        <Post key={post.post.postId} feedPost={post} />
      ))}
    </>
  );
};
