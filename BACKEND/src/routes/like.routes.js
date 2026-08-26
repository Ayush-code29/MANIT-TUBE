import { Router } from "express";

import {
  likeVideo,
  unlikeVideo,
  getLikeStatus,
} from "../controllers/like.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { optionalAuth } from "../middlewares/optionalAuth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET LIKE STATUS
|--------------------------------------------------------------------------
| Public route.
| Returns total likes even when user is logged out.
|--------------------------------------------------------------------------
*/

router.get(
  "/:videoId",
  optionalAuth,
  getLikeStatus
);

/*
|--------------------------------------------------------------------------
| LIKE
|--------------------------------------------------------------------------
*/

router.post(
  "/:videoId",
  verifyJWT,
  likeVideo
);

/*
|--------------------------------------------------------------------------
| UNLIKE
|--------------------------------------------------------------------------
*/

router.delete(
  "/:videoId",
  verifyJWT,
  unlikeVideo
);

export default router;