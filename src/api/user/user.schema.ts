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

const paramsUsername = {
  params: object({
    username: string(),
  }),
};

export const getUsersWithQuerySchema = z.object({
  query: object({
    limit: string().optional(),
    cursor: string().optional(),
    username: string().optional(),
  }),
});

export const getUserByIdSchema = z.object({
  ...paramsId,
});

export const updateUserByIdSchema = z.object({
  ...payload,
  ...paramsId,
});

export const getUserByUsernameSchema = z.object({
  ...paramsUsername,
});

export type GetUsersWithQuery = z.infer<typeof getUsersWithQuerySchema>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
export type UpdateUserByIdInput = z.infer<typeof updateUserByIdSchema>;
export type GetUserByUsernameInput = z.infer<typeof getUserByUsernameSchema>;
