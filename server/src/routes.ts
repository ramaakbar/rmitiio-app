import express, { Request, Response } from "express";
import authRoutes from "./api/auth/auth.route";
import postRoutes from "./api/post/post.route";
import userRoutes from "./api/user/user.route";
import commentRoutes from "./api/comment/comment.route";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Rmitiio rest api " });
});

router.use("/auth", authRoutes);
router.use(postRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);

router.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route Not Found" });
});

export = router;
