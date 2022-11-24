import { object, string, z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    MessageResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: test.user@example.com
 *        password:
 *          type: string
 *          default: password
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: test.user@example.com
 *        username:
 *          type: string
 *          default: Test_User
 *        password:
 *          type: string
 *          default: password
 *        passwordConfirmation:
 *          type: string
 *          default: password
 *    LoginResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *    RegisterUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        email:
 *          type: string
 *        username:
 *          type: string
 *        picture:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string

 */

export const registerSchema = z.object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("not a valid email"),
    username: string({
      required_error: "Username is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password Confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const loginSchema = z.object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("not a valid email"),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export type RegisterInput = Omit<
  z.infer<typeof registerSchema>,
  "passwordConfirmation"
>;

export type LoginInput = z.infer<typeof loginSchema>;
