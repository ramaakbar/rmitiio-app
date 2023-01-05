import express from "express";
import multer from "multer";
import validate from "../../middleware/validateResource";
import verifyJWT from "../../middleware/verifyJWT";
import {
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
  getCommentsByPostIdHandler,
} from "./comment.controller";
import {
  createCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
  getCommentsByPostIdSchema,
} from "./comment.schema";

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get(
  "/:postId",
  [validate(getCommentsByPostIdSchema)],
  getCommentsByPostIdHandler
);
router.post(
  "/:postId",
  // [verifyJWT, validate(createCommentSchema)],
  [verifyJWT, upload.single("picture")],
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
