import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
const registerUser = async (req, res) => {
  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const avatarLocalPath = req.file?.path;

if (!avatarLocalPath) {
  return res.status(400).json({
    message: "Avatar file is required"
  });
}

const avatar = await uploadOnCloudinary(avatarLocalPath);

if (!avatar) {
  return res.status(500).json({
    message: "Avatar upload failed"
  });
}

const user = await User.create({
  username,
  email,
  fullName,
  password,
  avatar: avatar.url,
});

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(201).json(createdUser);
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      accessToken,
      refreshToken,
    });
};
const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};
const logoutUser = async (req, res) => {
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

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User logged out successfully",
    });
};
export {
  registerUser,
  loginUser,
  getCurrentUser,logoutUser
};