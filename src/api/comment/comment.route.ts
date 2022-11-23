import express from "express";
import validate from "../../middleware/validateResource";
import verifyJWT from "../../middleware/verifyJWT";
import {
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from "./comment.controller";
import {
  createCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
} from "./comment.schema";

const router = express.Router();

router.post(
  "/:postId",
  [verifyJWT, validate(createCommentSchema)],
  createCommentHandler
);
router.patch(
  "/:commentId",
  [verifyJWT, validate(updateCommentSchema)],
  updateCommentHandler
);
router.delete(
  "/:commentId",
  [verifyJWT, validate(deleteCommentSchema)],
  deleteCommentHandler
);

export = router;
