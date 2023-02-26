import express from "express";
import { handler } from "./repo.controller";

const router = express.Router();

router.get("/pinned/:username", handler);

export = router;
