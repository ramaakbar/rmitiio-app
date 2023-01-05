import { string, z } from "zod";

export const loginSchema = z.object({
  email: string()
    .min(1, { message: "Email is required" })
    .email("not a valid email"),
  password: string().min(1, { message: "Password is required" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
