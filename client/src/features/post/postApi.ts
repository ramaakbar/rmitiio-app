import axios from "axios";
import { refreshAccessTknFn } from "../auth/authApi";
import { PostInput } from "./schemas/postSchema";
import { PostResponse, PostsResponse, PostType } from "./postTypes";

const BASE_URL = "http://127.0.0.1:4000/api/posts";

const postApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

postApi.defaults.headers.common["Content-Type"] = "application/json";

postApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (
      errMessage.includes("Access Token Expired") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const { accessToken } = await refreshAccessTknFn();
      localStorage.setItem("accessToken", accessToken);
      return postApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const fetchInfinitePosts = async ({ pageParam = "" }) => {
  const res = await postApi.get<PostsResponse>("/cursor?cursor=" + pageParam);
  return res.data;
};

export const createPost = async (
  postInput: FormData,
  token: string | undefined
) => {
  const res = await postApi.post<PostType>("", postInput, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const fetchPost = async (id: string | undefined) => {
  const res = await postApi.get<PostResponse>(`/${id}`);
  return res.data;
};
