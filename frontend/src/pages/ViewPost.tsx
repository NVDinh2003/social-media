import React, { useEffect, useState } from "react";

import "./ViewPost.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { FeedPost, Post } from "../utils/GlobalInterface";
import axios from "axios";
import { PostBanner } from "../features/post/components/Post/PostBanner/PostBanner";
import { IndividualPost } from "../features/post/components/IndividualPost/IndividualPost";
import { IndividualReply } from "../features/post/components/IndividualReply/IndividualReply";
import { setCurrentPost, setFeedPosts } from "../redux/Slices/FeedSlice";
import { repostPost } from "../redux/Slices/PostSlice";
import { IndividualPostReplies } from "../features/post/components/IndividualPost/IndividualPostReplies/IndividualPostReplies";

export const ViewPost: React.FC = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { postId } = useParams();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const feed = useSelector((state: RootState) => state.feed.posts);
  const post = useSelector((state: RootState) => state.feed.currentPost);
  const dispatch: AppDispatch = useDispatch();

  const setCurrentPostAndFeed = (post: Post) => {
    dispatch(setCurrentPost(post));
    let feedPosts: FeedPost[] = [];
    feedPosts.push({
      post,
      replyTo: null,
      repost: false,
      repostUser: post.author,
    });

    let replies = post.replies.map((reply) => {
      let feedPost: FeedPost = {
        post: reply,
        replyTo: null,
        repost: false,
        repostUser: post.author,
      };

      return feedPost;
    });

    feedPosts = [...feedPosts, ...replies];
    dispatch(setFeedPosts(feedPosts));
  };

  const fetchPostById = async () => {
    const req = await axios.get(`${baseURL}/posts/${postId}`);

    const post = req.data;
    setCurrentPostAndFeed(post);
  };

  useEffect(() => {
    if (postId && feed.some((post) => post.post.postId === +postId)) {
      feed.forEach((post) => {
        if (post.post.postId === +postId) {
          setCurrentPostAndFeed(post.post);
          return;
        }
      });
    } else {
      fetchPostById();
    }
  }, [postId]);

  useEffect(() => {
    if (post) {
      setCurrentPostAndFeed(post);
    }
  }, [post?.replies.length]);

  return (
    <div className="view-post">
      <PostBanner />
      {post && <IndividualPost post={post} />}

      {post && loggedIn && (
        <IndividualReply user={loggedIn} originalPost={post} />
      )}

      {post && <IndividualPostReplies />}
    </div>
  );
};
