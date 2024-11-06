import React, { useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";

import { FeedPost, Post } from "../../../../utils/GlobalInterface";

interface ProfileUserPostProps {
  posts: Post[];
}

export const ProfileUserPost: React.FC<ProfileUserPostProps> = ({ posts }) => {
  const hiddenDiv = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

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
    <div className="w-full flex flex-col min-h-screen ">
      {/* {posts.map((post) => (
        <Post feedPost={post} key={post.post.postId} notification={false} />
      ))}
      <div id="autoload" ref={hiddenDiv} hidden={posts.length === 0}>
        <CircularProgress
          size={30}
          sx={{
            color: "#1da1f2",
          }}
        />
      </div> */}
    </div>
  );
};
