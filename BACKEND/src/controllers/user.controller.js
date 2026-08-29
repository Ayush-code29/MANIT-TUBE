import User from "../models/user.model.js";

import uploadOnCloudinary from "../utils/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Cookie Options
|--------------------------------------------------------------------------
|
| Local:
|   secure: false
|   sameSite: "lax"
|
| Production:
|   secure: true
|   sameSite: "none"
|
| Production mein frontend aur backend different origins
| par hone ki wajah se SameSite=None required hai.
|
|--------------------------------------------------------------------------
*/

const isProduction =
  process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction
    ? "none"
    : "lax",
};

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      fullName,
      password,
    } = req.body;

    if (
      [
        username,
        email,
        fullName,
        password,
      ].some(
        (field) =>
          field?.trim() === ""
      )
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const existedUser =
      await User.findOne({
        $or: [
          { username },
          { email },
        ],
      });

    if (existedUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const avatarLocalPath =
      req.file?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({
        message:
          "Avatar file is required",
      });
    }

    const avatar =
      await uploadOnCloudinary(
        avatarLocalPath
      );

    if (!avatar) {
      return res.status(500).json({
        message:
          "Avatar upload failed",
      });
    }

    const user =
      await User.create({
        username,
        email,
        fullName,
        password,
        avatar: avatar.url,
      });

    const createdUser =
      await User.findById(
        user._id
      ).select(
        "-password -refreshToken"
      );

    return res.status(201).json(
      createdUser
    );
  } catch (error) {
    console.error(
      "Register error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Unable to register user.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password required",
      });
    }

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid =
      await user.isPasswordCorrect(
        password
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

    /*
     * Generate tokens
     */
    const accessToken =
      user.generateAccessToken();

    const refreshToken =
      user.generateRefreshToken();

    /*
     * Save refresh token
     */
    user.refreshToken =
      refreshToken;

    await user.save({
      validateBeforeSave: false,
    });

    /*
     * Get safe user object
     */
    const loggedInUser =
      await User.findById(
        user._id
      ).select(
        "-password -refreshToken"
      );

    /*
     * Set authentication cookies.
     *
     * IMPORTANT:
     * In production:
     *
     * secure: true
     * sameSite: "none"
     *
     * This allows the browser to send
     * the cookie from the deployed frontend.
     */
    return res
      .status(200)
      .cookie(
        "accessToken",
        accessToken,
        cookieOptions
      )
      .cookie(
        "refreshToken",
        refreshToken,
        cookieOptions
      )
      .json({
        user: loggedInUser,

        /*
         * Keeping tokens in response for compatibility
         * with your existing frontend/backend.
         *
         * Authentication itself uses the HTTP-only cookie.
         */
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Unable to login.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Current User
|--------------------------------------------------------------------------
*/

const getCurrentUser = async (
  req,
  res
) => {
  return res.status(200).json({
    user: req.user,
  });
};

/*
|--------------------------------------------------------------------------
| Logout User
|--------------------------------------------------------------------------
*/

const logoutUser = async (
  req,
  res
) => {
  try {
    if (req.user?._id) {
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $unset: {
            refreshToken: 1,
          },
        },
        {
          new: true,
        }
      );
    }

    /*
     * Clear cookies using the SAME
     * options used when setting them.
     */
    return res
      .status(200)
      .clearCookie(
        "accessToken",
        cookieOptions
      )
      .clearCookie(
        "refreshToken",
        cookieOptions
      )
      .json({
        message:
          "User logged out successfully",
      });
  } catch (error) {
    console.error(
      "Logout error:",
      error
    );

    /*
     * Even if DB operation fails,
     * clear cookies on client.
     */
    return res
      .status(500)
      .clearCookie(
        "accessToken",
        cookieOptions
      )
      .clearCookie(
        "refreshToken",
        cookieOptions
      )
      .json({
        message:
          "Unable to logout.",
      });
  }
};

export {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};