import Video from "../models/video.model.js";
import mongoose from "mongoose";
const verifyVideoOwner = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    if (video.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to modify this video",
      });
    }

    req.video = video;

    next();
  } catch (error) {
    console.log("Verify Video Owner Error:", error);

    return res.status(500).json({
      message: "Failed to verify video ownership",
    });
  }
};

export { verifyVideoOwner };