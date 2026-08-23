import express from "express";
import { verifyVideoOwner } from "../middlewares/video.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import { uploadVideo,getAllVideos,getVideoById,updateVideo,deleteVideo } from "../controllers/video.controller.js";

const router = express.Router();

router.post(
  "/upload",
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadVideo
);
router.get("/", getAllVideos);
router.get("/:videoId", getVideoById);
router.patch(
  "/:videoId",
  verifyJWT,
  verifyVideoOwner,
  updateVideo
);
router.delete(
  "/:videoId",
  verifyJWT,
  verifyVideoOwner,
  deleteVideo
);
export default router;