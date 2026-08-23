import { Router } from "express";
import { getCurrentUser, registerUser,logoutUser,loginUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();


router.route("/register").post(
  upload.single("avatar"),
  registerUser
);
router.route("/login").post(loginUser);
router
  .route("/me")
  .get(verifyJWT, getCurrentUser);


router
  .route("/logout")
  .post(verifyJWT, logoutUser);
export default router;