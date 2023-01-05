import { string, z } from "zod";

export const registerSchema = z
  .object({
    email: string()
      .min(1, { message: "Email is required" })
      .email("not a valid email"),
    username: string().min(1, { message: "Username is required" }),
    password: string()
      .min(1, { message: "Password is required" })
      .min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password Confirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterInputWithoutPassConf = Omit<
  RegisterInput,
  "passwordConfirmation"
>;
