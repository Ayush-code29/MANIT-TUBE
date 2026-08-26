import mongoose from "mongoose";

import Video from "../models/video.model.js";
import VideoLike from "../models/videoLike.model.js";
import VideoSave from "../models/videoSave.model.js";

const validateVideo = async (videoId) => {
  if (!mongoose.isValidObjectId(videoId)) {
    return null;
  }

  return Video.findOne({
    _id: videoId,
    isPublished: true,
  });
};

const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await validateVideo(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    await VideoLike.create({
      video: videoId,
      user: req.user._id,
    }).catch((error) => {
      if (error.code !== 11000) {
        throw error;
      }
    });

    return res.status(200).json({
      message: "Video liked",
    });
  } catch (error) {
    console.error(
      "Like Video Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to like video",
    });
  }
};

const unlikeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    await VideoLike.findOneAndDelete({
      video: videoId,
      user: req.user._id,
    });

    return res.status(200).json({
      message: "Video unliked",
    });
  } catch (error) {
    console.error(
      "Unlike Video Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to unlike video",
    });
  }
};

const saveVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await validateVideo(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    await VideoSave.create({
      video: videoId,
      user: req.user._id,
    }).catch((error) => {
      if (error.code !== 11000) {
        throw error;
      }
    });

    return res.status(200).json({
      message: "Video saved",
    });
  } catch (error) {
    console.error(
      "Save Video Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to save video",
    });
  }
};

const unsaveVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    await VideoSave.findOneAndDelete({
      video: videoId,
      user: req.user._id,
    });

    return res.status(200).json({
      message: "Video removed from saved",
    });
  } catch (error) {
    console.error(
      "Unsave Video Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to unsave video",
    });
  }
};

export {
  likeVideo,
  unlikeVideo,
  saveVideo,
  unsaveVideo,
};