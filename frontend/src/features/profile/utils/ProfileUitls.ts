import { FeedPost, Post, User } from "../../../utils/GlobalInterface";

export const convertNumberOfPostsToString = (numberOfPosts: number): string => {
  if (numberOfPosts >= 1000 && numberOfPosts < 1_000_000)
    return `${(numberOfPosts % 1000).toFixed(1)}K`;

  if (numberOfPosts >= 1_000_000)
    return `${(numberOfPosts / 1_000_000).toFixed(1)}M`;

  return `${numberOfPosts}`;
};

export const convertPostToFeedPost = (
  post: Post,
  repost: boolean = false,
  repostUser: User = post.author,
  replyTo: Post | null = null
): FeedPost => {
  return {
    post: post,
    replyTo: replyTo,
    repost: repost,
    repostUser: repostUser,
  };
};
