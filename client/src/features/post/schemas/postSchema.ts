import { any, string, z } from "zod";

export const postSchema = z.object({
  content: string().min(1, { message: "Content is required" }),
  picture: any(),
});

export type PostInput = z.infer<typeof postSchema>;
