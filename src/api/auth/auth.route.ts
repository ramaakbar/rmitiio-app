import express from "express";
import loginLimiter from "../../middleware/loginLimitter";
import validate from "../../middleware/validateResource";
import {
  loginHandler,
  registerHandler,
  refreshHandler,
  logoutHandler,
} from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";

const router = express.Router();

/**
 * @openapi
 * '/api/auth':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User successfully login. Refresh token is stored in cookie named `jwt` and access token is return as response. You need to include cookie and access token in subsequent request
 *         headers:
 *          Set-Cookie:
 *            schema:
 *              type: string
 *              example: jwt=abcde12345; Path=/; HttpOnly
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Error, Bad Request
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       401:
 *         description: Error, Wrong credentials
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Error, User not found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Error, Internal server
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 */
router.post("/", [validate(loginSchema), loginLimiter], loginHandler);

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *       200:
 *         description: User successfuly registered
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterUserResponse'
 *       400:
 *         description: Error, Bad Request
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       409:
 *         description: Error, Conflict
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Error, Internal server
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 */
router.post("/register", validate(registerSchema), registerHandler);

/**
 * @openapi
 * '/api/auth/refresh':
 *  get:
 *     tags:
 *     - Auth
 *     summary: Get new access token using refresh token
 *     security:
 *       - cookieRefreshToken: []
 *     responses:
 *       200:
 *         description: return new access token
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Error, Unauthorized
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       403:
 *         description: Error, Forbidden
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Error, User not found
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Error, Internal server
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 */
router.get("/refresh", refreshHandler);

/**
 * @openapi
 * '/api/auth/logout':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Logout authenticated user, clear refreshtoken cookie
 *     responses:
 *       200:
 *         description: User successfully logout
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 *       201:
 *         description: Logout without jwt, no response
 */
router.post("/logout", logoutHandler);

export = router;
