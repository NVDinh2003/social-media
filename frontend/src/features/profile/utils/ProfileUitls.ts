import { FeedPost, Post } from "../../../utils/GlobalInterface";

export const convertNumberOfPostsToString = (numberOfPosts: number): string => {
  if (numberOfPosts >= 1000 && numberOfPosts < 1_000_000)
    return `${(numberOfPosts % 1000).toFixed(1)}K`;

  if (numberOfPosts >= 1_000_000)
    return `${(numberOfPosts / 1_000_000).toFixed(1)}M`;

  return `${numberOfPosts}`;
};

export const convertPostToFeedPost = (post: Post): FeedPost => {
  return {
    post: post,
    replyTo: post.replyTo || null,
    repost: false,
    repostUser: post.author,
  };
};
