import { checkFollowing } from "../../../services/UserService";
import { User } from "../../../utils/GlobalInterface";

export function generateFollowingText(
  users: User[],
  following: User[],
  followers: User[]
): string {
  if (users.length === 1) {
    let user = users[0];
    let loggedInUserFollowsUser = checkFollowing(following, user);
    let userFollowsLoggedInUser = checkFollowing(followers, user);

    if (!loggedInUserFollowsUser && !userFollowsLoggedInUser) return "";
    if (!loggedInUserFollowsUser && userFollowsLoggedInUser)
      return "Follows you";
    if (loggedInUserFollowsUser && !userFollowsLoggedInUser) return "Following";
    if (loggedInUserFollowsUser && userFollowsLoggedInUser)
      return "You follow each other";
  } else return "";

  return "";
}

export function generateConversationName(
  users: User[],
  conversationName: string | undefined
): string {
  if (conversationName) return conversationName;
  if (users.length === 1) return users[0].nickname;
  else if (users.length === 2) {
    return `${users[0].nickname}, ${users[1].nickname}`;
  } else if (users.length > 2) {
    return `${users[0].nickname}, ${users[1].nickname} and ${
      users.length - 2
    } others`;
  }

  return "";
}
