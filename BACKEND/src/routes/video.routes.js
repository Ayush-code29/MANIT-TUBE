import express from "express";

import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  unlikeVideo,
  getLikeStatus,
  updateVideo,
  deleteVideo,
} from "../controllers/video.controller.js";

import {
  verifyVideoOwner,
} from "../middlewares/video.middleware.js";

import {
  upload,
} from "../middlewares/multer.middleware.js";

import {
  verifyJWT,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Upload
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Public videos
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getAllVideos
);

/*
|--------------------------------------------------------------------------
| Like routes
|--------------------------------------------------------------------------
*/

router.post(
  "/:videoId/like",
  verifyJWT,
  likeVideo
);

router.delete(
  "/:videoId/like",
  verifyJWT,
  unlikeVideo
);

router.get(
  "/:videoId/like-status",
  verifyJWT,
  getLikeStatus
);

/*
|--------------------------------------------------------------------------
| Single video
|--------------------------------------------------------------------------
*/

router.get(
  "/:videoId",
  getVideoById
);

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

router.patch(
  "/:videoId",

  verifyJWT,

  verifyVideoOwner,

  updateVideo
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete(
  "/:videoId",

  verifyJWT,

  verifyVideoOwner,

  deleteVideo
);

export default router;