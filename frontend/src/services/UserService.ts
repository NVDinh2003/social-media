import axios from "axios";
import { User } from "../utils/GlobalInterface";

const baseURL = process.env.REACT_APP_API_URL;

export const checkFollowing = (followingList: User[], currentUser: User) => {
  return followingList.some((user) => user.userId === currentUser.userId);
};

export async function getFollowers(username: string) {
  try {
    const req = await axios.get(`${baseURL}/users/followers/${username}`);
    // console.log("follower", req.data);
    return req.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getFollowing(username: string) {
  try {
    const req = await axios.get(`${baseURL}/users/following/${username}`);
    // console.log("following: ", req.data);
    return req.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
