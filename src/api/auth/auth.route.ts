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

router.post("/", [validate(loginSchema), loginLimiter], loginHandler);

router.post("/register", validate(registerSchema), registerHandler);

router.get("/refresh", refreshHandler);

router.post("/logout", logoutHandler);

export = router;
