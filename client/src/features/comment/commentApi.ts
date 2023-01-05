import axios from "axios";
import { refreshAccessTknFn } from "../auth/authApi";
import { PostInput } from "../post/schemas/postSchema";
import { CommentsResponse, CommentType } from "./commentTypes";

const BASE_URL = "http://127.0.0.1:4000/api/comments";

const commentApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

commentApi.defaults.headers.common["Content-Type"] = "application/json";

commentApi.interceptors.response.use(
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
      return commentApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const fetchInfiniteCommentsByPostId = async ({
  postId = "",
  pageParam = "",
}) => {
  const res = await commentApi.get<CommentsResponse>(
    `/${postId}?cursor=${pageParam}`
  );
  return res.data;
};

export const createComment = async (
  postId = "",
  postInput: FormData,
  token: string | undefined
) => {
  const res = await commentApi.post<CommentType>(`/${postId}`, postInput, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
