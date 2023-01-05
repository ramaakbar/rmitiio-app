import { object, string, z } from "zod";

const payload = {
  body: object({
    content: string({
      required_error: "Content is required",
    }).max(300, {
      message: "Content must be 300 or fewer characters long",
    }),
  }),
};

const params = {
  params: object({
    postId: string(),
  }),
};

const offsetPaginateQuery = {
  query: object({
    limit: string().optional(),
    page: string().optional(),
  }),
};

const cursorPaginateQuery = {
  query: object({
    limit: string().optional(),
    cursor: string().optional(),
  }),
};

export const getPostsOffsetPaginateSchema = z.object({
  ...offsetPaginateQuery,
});

export const getPostsCursorPaginateSchema = z.object({
  ...cursorPaginateQuery,
});

export const createPostSchema = z.object({
  ...payload,
});

export const updatePostSchema = z.object({
  ...payload,
  ...params,
});

export const deletePostSchema = z.object({
  ...params,
});

export const getPostSchema = z.object({
  ...params,
});

export const getUserPostsSchema = z.object({
  params: object({
    username: string(),
  }),
  ...cursorPaginateQuery,
});

export type GetPostsOffsetPaginateQuery = z.infer<
  typeof getPostsOffsetPaginateSchema
>;
export type GetPostsCursorPaginateQuery = z.infer<
  typeof getPostsCursorPaginateSchema
>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type DeletePostInput = z.infer<typeof deletePostSchema>;
export type GetPostInput = z.infer<typeof getPostSchema>;
export type GetUserPostsInput = z.infer<typeof getUserPostsSchema>;
