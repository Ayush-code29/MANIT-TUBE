import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const verifyJWT = async (
  req,
  res,
  next
) => {
  try {
    /*
     * First try HTTP-only cookie.
     *
     * Then fallback to Authorization header.
     *
     * This keeps compatibility with your
     * existing frontend/API usage.
     */
    const token =
      req.cookies?.accessToken ||
      req
        .header("Authorization")
        ?.replace(
          "Bearer ",
          ""
        );

    if (!token) {
      return res.status(401).json({
        message:
          "Unauthorized request",
      });
    }

    /*
     * Verify JWT
     */
    const decodedToken =
      jwt.verify(
        token,
        process.env
          .ACCESS_TOKEN_SECRET
      );

    /*
     * Find user
     */
    const user =
      await User.findById(
        decodedToken._id
      ).select(
        "-password -refreshToken"
      );

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid access token",
      });
    }

    /*
     * Attach user to request
     */
    req.user = user;

    next();
  } catch (error) {
    console.error(
      "JWT verification error:",
      error.message
    );

    return res.status(401).json({
      message:
        "Invalid or expired access token",
    });
  }
};

export {
  verifyJWT,
};