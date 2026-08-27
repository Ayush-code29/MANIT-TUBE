import jwt from "jsonwebtoken";

const optionalAuth = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req
        .header("Authorization")
        ?.replace("Bearer ", "");

    if (!token) {
      req.user = null;
      return next();
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = {
      _id: decodedToken._id,
      email: decodedToken.email,
      username: decodedToken.username,
    };

    next();
  } catch (error) {
    // Invalid/expired token should not block
    // public requests.
    req.user = null;
    next();
  }
};

export { optionalAuth };