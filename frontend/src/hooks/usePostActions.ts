import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { Post, User } from "../utils/GlobalInterface";
import { setCurrentPost, updatePost } from "../redux/Slices/FeedSlice";
import { updateDisplayCreateReply } from "../redux/Slices/ModalSlice";
import {
  starPost,
  likePost,
  repostPost,
  viewPost,
} from "../redux/Slices/PostSlice";
import { useCallback } from "react";

export function usePostActions() {
  const token = useSelector((state: RootState) => state.user.token);
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const dispatch: AppDispatch = useDispatch();

  // Memoize the functions using useCallback
  const hasUserLiked = useCallback(
    (post: Post) => {
      return (
        loggedIn && post.likes.some((user) => user.userId === loggedIn.userId)
      );
    },
    [loggedIn]
  );

  const hasUserReposted = useCallback(
    (post: Post) => {
      return (
        loggedIn && post.reposts.some((user) => user.userId === loggedIn.userId)
      );
    },
    [loggedIn]
  );

  const hasUserStarred = useCallback(
    (post: Post) => {
      return (
        loggedIn && post.stars.some((user) => user.userId === loggedIn.userId)
      );
    },
    [loggedIn]
  );

  const toggleReply = (post: Post) => {
    dispatch(setCurrentPost(post));
    dispatch(updateDisplayCreateReply());
  };

  const createRepost = (post: Post) => {
    let updatedPost = JSON.parse(JSON.stringify(post));

    if (
      loggedIn &&
      !post.reposts.some((user) => user.userId === loggedIn.userId)
    ) {
      // console.log("adding repost user");
      let reposts = [...post.reposts, loggedIn];
      updatedPost = {
        ...updatedPost,
        reposts,
      };
      dispatch(updatePost(updatedPost));
    }

    if (
      loggedIn &&
      post.reposts.some((user) => user.userId === loggedIn.userId)
    ) {
      // console.log("removed");
      let reposts = updatedPost.reposts.filter(
        (user: User) => user.userId !== loggedIn.userId
      );
      updatedPost = {
        ...updatedPost,
        reposts,
      };

      dispatch(updatePost(updatedPost));
    }

    dispatch(
      repostPost({
        postId: post.postId,
        token,
      })
    );
  };

  const createLike = (post: Post) => {
    let updatedPost = JSON.parse(JSON.stringify(post));
    if (
      loggedIn &&
      !post.likes.some((user) => user.userId === loggedIn.userId)
    ) {
      let likes = [...post.likes, loggedIn];
      updatedPost = {
        ...updatedPost,
        likes,
      };
      dispatch(updatePost(updatedPost));
    }
    if (
      loggedIn &&
      post.likes.some((user) => user.userId === loggedIn.userId)
    ) {
      let likes = updatedPost.likes.filter(
        (user: User) => user.userId !== loggedIn.userId
      );
      updatedPost = {
        ...updatedPost,
        likes,
      };

      dispatch(updatePost(updatedPost));
    }

    dispatch(
      likePost({
        postId: post.postId,
        token,
      })
    );
  };

  const giveStar = (post: Post) => {
    let updatedPost = JSON.parse(JSON.stringify(post));
    if (
      loggedIn &&
      !post.stars.some((user) => user.userId === loggedIn.userId)
    ) {
      let stars = [...post.stars, loggedIn];
      updatedPost = {
        ...updatedPost,
        stars,
      };
      dispatch(updatePost(updatedPost));
    }
    if (
      loggedIn &&
      post.stars.some((user) => user.userId === loggedIn.userId)
    ) {
      let stars = updatedPost.stars.filter(
        (user: User) => user.userId !== loggedIn.userId
      );
      updatedPost = {
        ...updatedPost,
        stars,
      };

      dispatch(updatePost(updatedPost));
    }

    dispatch(
      starPost({
        postId: post.postId,
        token,
      })
    );
  };

  const createSingleView = (post: Post) => {
    let updatedPost = JSON.parse(JSON.stringify(post));
    if (
      loggedIn &&
      !post.views.some((user) => user.userId === loggedIn.userId)
    ) {
      let views = [...post.views, loggedIn];
      updatedPost = {
        ...updatedPost,
        views,
      };
      dispatch(updatePost(updatedPost));
      dispatch(
        viewPost({
          postId: post.postId,
          token,
        })
      );
    }
  };

  return {
    toggleReply,
    giveStar,
    createLike,
    createSingleView,
    createRepost,
    hasUserLiked,
    hasUserReposted,
    hasUserStarred,
  };
}
