import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { Post as IPost, User } from "../../../../utils/GlobalInterface";
import axios from "axios";
import { Post } from "../../../post/components/Post/Post";
import { convertPostToFeedPost } from "../../utils/ProfileUitls";

interface ProfileUserReplyPostProps {
  profileUser: User;
}

export const ProfileUserReplyPost: React.FC<ProfileUserReplyPostProps> = ({
  profileUser,
}) => {
  const hiddenDiv = useRef<HTMLDivElement>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const [replyPosts, setReplyPosts] = useState<IPost[]>([]);
  const [replyPostsTo, setReplyPostsTo] = useState<IPost[]>([]);

  const fetchUserReplyPosts = async () => {
    try {
      let req = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/reply/user/${profileUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplyPosts(req.data.map((item: any) => item.post));
      setReplyPostsTo(req.data.map((item: any) => item.replyTo));
    } catch (e) {
      console.log("Issue loading posts: ", e);
    }
  };

  useEffect(() => {
    // console.log("fetching reply post for user!");
    if (profileUser && token) fetchUserReplyPosts();

    // console.log("reply posts");
  }, [profileUser, token]);

  return (
    <div className="w-full flex flex-col min-h-screen ">
      {replyPosts.map((post, index) => (
        <Post
          feedPost={convertPostToFeedPost(
            post,
            false,
            post.author,
            replyPostsTo[index]
          )}
          key={post.postId}
          notification={false}
        />
      ))}
      <div id="autoload" ref={hiddenDiv} hidden={replyPosts.length === 0}>
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
