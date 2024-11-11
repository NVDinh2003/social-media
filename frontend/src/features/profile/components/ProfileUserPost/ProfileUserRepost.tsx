import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { Post as IPost, User } from "../../../../utils/GlobalInterface";
import { Post } from "../../../post/components/Post/Post";
import { convertPostToFeedPost } from "../../utils/ProfileUitls";
import axios from "axios";
import { Nothing } from "../../../../components/Nothing/Nothing";

interface ProfileUserRepostProps {
  profileUser: User;
}

export const ProfileUserRepost: React.FC<ProfileUserRepostProps> = ({
  profileUser,
}) => {
  const hiddenDiv = useRef<HTMLDivElement>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const [repostPosts, setRepostPosts] = useState<IPost[]>([]);

  const fetchRepostPosts = async () => {
    try {
      let req = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/repost/user/${profileUser.userId}`,
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
    if (profileUser && token) fetchRepostPosts();
  }, [profileUser, token]);

  return (
    <>
      {repostPosts.length === 0 ? (
        <Nothing />
      ) : (
        <div className="w-full flex flex-col min-h-screen ">
          {repostPosts.map((post) => (
            <Post
              feedPost={convertPostToFeedPost(post, true, profileUser)}
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
      )}
    </>
  );
};
