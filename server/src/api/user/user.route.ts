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

router.get("/", validate(getUsersWithQuerySchema), getUsersHandler);
router.get(
  "/:username",
  validate(getUserByUsernameSchema),
  getUserByUsernameHandler
);
router.get("/:userId", validate(getUserByIdSchema), getUserByIdHandler);
router.patch(
  "/:userId",
  [verifyJWT, validate(updateUserByIdSchema)],
  updateUserByIdHandler
);

export = router;
