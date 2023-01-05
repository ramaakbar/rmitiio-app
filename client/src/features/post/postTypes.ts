import { UserType } from "../auth/authTypes";
import { CommentType } from "../comment/commentTypes";

export type PostsResponse = {
  pagination: Pagination;
  data: PostType[];
};

export type PostResponse = {
  data: PostType;
};

export type PostType = {
  id: number;
  userId: number;
  content: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  comment?: CommentType[];
};

export type Pagination = {
  nextCursor: string;
};
