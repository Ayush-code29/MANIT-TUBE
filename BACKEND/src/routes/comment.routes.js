import { Router } from "express";

import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:videoId", getComments);

router.post("/:videoId", verifyJWT, addComment);

router.delete("/:commentId", verifyJWT, deleteComment);

export default router;