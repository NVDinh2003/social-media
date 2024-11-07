import React, { useEffect, useId, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { Post as IPost } from "../../../../utils/GlobalInterface";
import { Post } from "../../../post/components/Post/Post";
import { convertPostToFeedPost } from "../../utils/ProfileUitls";
import axios from "axios";

interface ProfileUserRepostProps {
  userId: number | string;
}

export const ProfileUserRepost: React.FC<ProfileUserRepostProps> = ({
  userId,
}) => {
  const hiddenDiv = useRef<HTMLDivElement>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const [repostPosts, setRepostPosts] = useState<IPost[]>([]);

  const fetchRepostPosts = async () => {
    try {
      let req = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/repost/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //   console.log(req.data);

      setRepostPosts(req.data);
    } catch (e) {
      console.log("Issue loading repost posts: ", e);
    }
  };

  useEffect(() => {
    console.log("fetching repost posts");
    if (userId && token) fetchRepostPosts();
  }, [userId, token]);

  return (
    <div className="w-full flex flex-col min-h-screen ">
      {repostPosts.map((post) => (
        <Post
          feedPost={convertPostToFeedPost(post)}
          key={post.postId}
          notification={false}
        />
      ))}
      <div id="autoload" ref={hiddenDiv} hidden={repostPosts.length === 0}>
        <CircularProgress
          size={30}
          sx={{
            color: "#1da1f2",
          }}
        />
      </div>
    </div>
  );
};
