import { Router } from "express";

import {
  subscribeChannel,
  unsubscribeChannel,
  getSubscriptionStatus,
} from "../controllers/subscription.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { optionalAuth } from "../middlewares/optionalAuth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET SUBSCRIPTION STATUS
|--------------------------------------------------------------------------
*/

router.get(
  "/:channelId",
  optionalAuth,
  getSubscriptionStatus
);

/*
|--------------------------------------------------------------------------
| SUBSCRIBE
|--------------------------------------------------------------------------
*/

router.post(
  "/:channelId",
  verifyJWT,
  subscribeChannel
);

/*
|--------------------------------------------------------------------------
| UNSUBSCRIBE
|--------------------------------------------------------------------------
*/

router.delete(
  "/:channelId",
  verifyJWT,
  unsubscribeChannel
);

export default router;