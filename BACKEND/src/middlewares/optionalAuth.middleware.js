import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const optionalAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace(
        "Bearer ",
        ""
      );

    // No token = guest user
    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      const user = await User.findById(
        decodedToken._id
      ).select("-password -refreshToken");

      req.user = user || null;
    } catch (error) {
      // Invalid/expired token should not
      // block public like-status request
      req.user = null;
    }

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

export { optionalAuth };