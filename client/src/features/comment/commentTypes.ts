import { UserType } from "../auth/authTypes";
import { Pagination } from "../post/postTypes";

export type CommentsResponse = {
  pagination: Pagination;
  data: CommentType[];
};

export type CommentType = {
  id: number;
  content: string;
  picture: string;
  userId: number;
  postId: number;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
};
