import express from "express";
import validate from "../../middleware/validateResource";
import verifyJWT from "../../middleware/verifyJWT";
import {
  getUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  getUserByUsernameHandler,
} from "./user.controller";
import {
  getUsersWithQuerySchema,
  getUserByIdSchema,
  updateUserByIdSchema,
  getUserByUsernameSchema,
} from "./user.schema";

const router = express.Router();

router.get("/users", validate(getUsersWithQuerySchema), getUsersHandler);
router.get("/users/:userId", validate(getUserByIdSchema), getUserByIdHandler); // masalah
router.patch(
  "/users/:userId",
  [verifyJWT, validate(updateUserByIdSchema)],
  updateUserByIdHandler
);

router.get(
  "/:username",
  validate(getUserByUsernameSchema),
  getUserByUsernameHandler
);

export = router;
