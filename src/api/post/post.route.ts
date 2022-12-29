import express from "express";
import validate from "../../middleware/validateResource";
import verifyJWT from "../../middleware/verifyJWT";
import {
  getPostsHandler,
  getPostsCursorHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  getPostHandler,
  getUserPostsHandler,
} from "./post.controller";
import {
  getPostsOffsetPaginateSchema,
  getPostsCursorPaginateSchema,
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  getPostSchema,
  getUserPostsSchema,
} from "./post.schema";

const router = express.Router();

router.get("/posts", validate(getPostsOffsetPaginateSchema), getPostsHandler);
router.get(
  "/posts/cursor",
  validate(getPostsCursorPaginateSchema),
  getPostsCursorHandler
);
router.post(
  "/posts",
  [verifyJWT, validate(createPostSchema)],
  createPostHandler
);
router.patch(
  "/posts/:postId",
  [verifyJWT, validate(updatePostSchema)],
  updatePostHandler
);
router.delete(
  "/posts/:postId",
  [verifyJWT, validate(deletePostSchema)],
  deletePostHandler
);
router.get("/posts/:postId", validate(getPostSchema), getPostHandler);

router.get(
  "/:username/posts",
  validate(getUserPostsSchema),
  getUserPostsHandler
);

export = router;
