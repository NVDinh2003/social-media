import React, { useEffect, useState } from "react";

import "./ViewPost.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Post } from "../utils/GlobalInterface";
import axios from "axios";
import { PostBanner } from "../features/post/components/Post/PostBanner/PostBanner";
import { IndividualPost } from "../features/post/components/IndividualPost/IndividualPost";

export const ViewPost: React.FC = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { postId } = useParams();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const [post, setPost] = useState<Post | undefined>();
  //   let post: Post | undefined;

  const fetchPostById = async () => {
    const req = await axios.get(`${baseURL}/posts/${postId}`);
    setPost(req.data);
  };

  useEffect(() => {
    if (postId && !post) {
      fetchPostById();
    }
    console.log(post);
  }, [postId, post]);

  return (
    <div className="view-post">
      <PostBanner />
      {post && <IndividualPost post={post} />}
    </div>
  );
};
