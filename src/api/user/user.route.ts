import express from "express";
import validate from "../../middleware/validateResource";
import verifyJWT from "../../middleware/verifyJWT";
import {
  getUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from "./user.controller";
import {
  getUsersWithQuerySchema,
  getUserByIdSchema,
  updateUserByIdSchema,
} from "./user.schema";

const router = express.Router();

router.get("/", validate(getUsersWithQuerySchema), getUsersHandler);
router.get("/:userId", validate(getUserByIdSchema), getUserByIdHandler);
router.patch(
  "/:userId",
  [verifyJWT, validate(updateUserByIdSchema)],
  updateUserByIdHandler
);

export = router;
