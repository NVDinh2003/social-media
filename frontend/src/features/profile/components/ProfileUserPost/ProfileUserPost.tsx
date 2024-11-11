import React, { useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { Post as IPost } from "../../../../utils/GlobalInterface";
import { Post } from "../../../post/components/Post/Post";
import { convertPostToFeedPost } from "../../utils/ProfileUitls";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { VerifiedNotifications } from "../../../notification/components/VerifiedNotifications/VerifiedNotifications";
import { Nothing } from "../../../../components/Nothing/Nothing";

interface ProfileUserPostProps {
  posts: IPost[];
}

export const ProfileUserPost: React.FC<ProfileUserPostProps> = ({ posts }) => {
  const hiddenDiv = useRef<HTMLDivElement>(null);
  const userState = useSelector((state: RootState) => state.user);

  // console.log("Profile post", posts);

  const fetchNextPosts = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting && userState.loggedIn && userState.token) {
        // Dispatch action to fetch next posts if needed
      }
    });
  };

  useEffect(() => {
    if (hiddenDiv && hiddenDiv.current) {
      const observer = new IntersectionObserver(fetchNextPosts, {
        root: null,
        threshold: 1,
      });

      const target = hiddenDiv.current;
      observer.observe(target);
    }
  }, [userState.token, userState.loggedIn]);

  return (
    <>
      {posts.length === 0 ? (
        <Nothing />
      ) : (
        <div className="w-full flex flex-col min-h-screen ">
          {posts
            .filter((post) => !post.replyTo)
            .map((post) => (
              <Post
                feedPost={convertPostToFeedPost(post)}
                key={post.postId}
                notification={false}
              />
            ))}
          <div id="autoload" ref={hiddenDiv} hidden={posts.length === 0}>
            <CircularProgress
              size={30}
              sx={{
                color: "#1da1f2",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
