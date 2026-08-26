import mongoose from "mongoose";
import Like from "../models/like.model.js";

/*
|--------------------------------------------------------------------------
| LIKE VIDEO
|--------------------------------------------------------------------------
*/

const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    const existingLike = await Like.findOne({
      video: videoId,
      user: req.user._id,
    });

    // Already liked
    if (existingLike) {
      const likesCount = await Like.countDocuments({
        video: videoId,
      });

      return res.status(200).json({
        liked: true,
        likesCount,
        message: "Video already liked",
      });
    }

    await Like.create({
      video: videoId,
      user: req.user._id,
    });

    const likesCount = await Like.countDocuments({
      video: videoId,
    });

    return res.status(201).json({
      liked: true,
      likesCount,
      message: "Video liked successfully",
    });
  } catch (error) {
    console.error("Like Video Error:", error);

    // Handles rare duplicate-key race condition
    if (error.code === 11000) {
      const likesCount = await Like.countDocuments({
        video: req.params.videoId,
      });

      return res.status(200).json({
        liked: true,
        likesCount,
        message: "Video already liked",
      });
    }

    return res.status(500).json({
      message: "Failed to like video",
    });
  }
};

/*
|--------------------------------------------------------------------------
| UNLIKE VIDEO
|--------------------------------------------------------------------------
*/

const unlikeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    await Like.findOneAndDelete({
      video: videoId,
      user: req.user._id,
    });

    const likesCount = await Like.countDocuments({
      video: videoId,
    });

    return res.status(200).json({
      liked: false,
      likesCount,
      message: "Video unliked successfully",
    });
  } catch (error) {
    console.error("Unlike Video Error:", error);

    return res.status(500).json({
      message: "Failed to unlike video",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET LIKE STATUS
|--------------------------------------------------------------------------
|
| This route is public.
|
| Logged in:
|   liked = true/false
|   likesCount = total likes
|
| Logged out:
|   liked = false
|   likesCount = total likes
|
|--------------------------------------------------------------------------
*/

const getLikeStatus = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    const likesCount = await Like.countDocuments({
      video: videoId,
    });

    let liked = false;

    if (req.user?._id) {
      const existingLike = await Like.findOne({
        video: videoId,
        user: req.user._id,
      });

      liked = Boolean(existingLike);
    }

    return res.status(200).json({
      liked,
      likesCount,
    });
  } catch (error) {
    console.error("Get Like Status Error:", error);

    return res.status(500).json({
      message: "Failed to fetch like status",
    });
  }
};

export {
  likeVideo,
  unlikeVideo,
  getLikeStatus,
};