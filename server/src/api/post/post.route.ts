import express from "express";
import validate from "../../middleware/validateResource";
import verifyJWT from "../../middleware/verifyJWT";
import multer from "multer";
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
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get("/posts", validate(getPostsOffsetPaginateSchema), getPostsHandler);
router.get(
  "/posts/cursor",
  validate(getPostsCursorPaginateSchema),
  getPostsCursorHandler
);
router.post(
  "/posts",
  // [verifyJWT, validate(createPostSchema)],
  [verifyJWT, upload.single("picture")],
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
