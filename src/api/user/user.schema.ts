import { object, string, z } from "zod";

const payload = {
  body: object({
    username: string().optional(),
    picture: string().optional(),
    password: string().optional(),
  }),
};

const paramsId = {
  params: object({
    userId: string(),
  }),
};

export const getUsersWithQuerySchema = z.object({
  query: object({
    limit: string().optional(),
    cursor: string().optional(),
    username: string().optional(),
  }),
});

export const getUserByUsernameSchema = z.object({
  params: object({
    username: string(),
  }),
});

export const getUserByIdSchema = z.object({
  ...paramsId,
});

export const updateUserByIdSchema = z.object({
  ...payload,
  ...paramsId,
});

export type GetUsersWithQuery = z.infer<typeof getUsersWithQuerySchema>;
export type GetUserByUsernameInput = z.infer<typeof getUserByUsernameSchema>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
export type UpdateUserByIdInput = z.infer<typeof updateUserByIdSchema>;
