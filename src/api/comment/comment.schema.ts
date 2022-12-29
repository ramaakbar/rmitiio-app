import { object, string, z } from "zod";

const payload = {
  body: object({
    content: string({
      required_error: "Content is required",
    }).max(200, {
      message: "Content must be 100 or fewer characters long",
    }),
  }),
};

const postIdParams = {
  params: object({
    postId: string(),
  }),
};

const commentIdParams = {
  params: object({
    commentId: string(),
  }),
};

export const getCommentsByPostIdSchema = z.object({
  ...postIdParams,
});

export const createCommentSchema = z.object({
  ...payload,
  ...postIdParams,
});

export const updateCommentSchema = z.object({
  ...payload,
  ...commentIdParams,
});

export const deleteCommentSchema = z.object({
  ...commentIdParams,
});

export type GetCommentsByPostIdInput = z.infer<
  typeof getCommentsByPostIdSchema
>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type DeleteCommentInput = z.infer<typeof deleteCommentSchema>;
