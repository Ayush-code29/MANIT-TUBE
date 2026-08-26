import { Router } from "express";

import {
  saveVideo,
  unsaveVideo,
  getSaveStatus,
  getSavedVideos,
} from "../controllers/save.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  verifyJWT,
  getSavedVideos
);

router.get(
  "/status/:videoId",
  verifyJWT,
  getSaveStatus
);

router.post(
  "/:videoId",
  verifyJWT,
  saveVideo
);

router.delete(
  "/:videoId",
  verifyJWT,
  unsaveVideo
);

export default router;