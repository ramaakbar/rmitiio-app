import axios from "axios";
import { PostsResponse } from "../post/postTypes";
import { UserResponse } from "./userTypes";

const BASE_URL = "http://127.0.0.1:4000/api";

const profileApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchInfinitePostsByUsername = async ({
  username = "",
  pageParam = "",
}) => {
  const res = await profileApi.get<PostsResponse>(
    `/${username}/posts?cursor=${pageParam}`
  );
  return res.data;
};

export const fetchUserByUsername = async (username: string | undefined) => {
  const res = await profileApi<UserResponse>(`/users/${username}`);
  return res.data;
};
