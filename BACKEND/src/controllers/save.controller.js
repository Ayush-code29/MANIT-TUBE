import mongoose from "mongoose";

import Save from "../models/save.model.js";
import Video from "../models/video.model.js";

const saveVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    const video = await Video.findOne({
      _id: videoId,
      isPublished: true,
    });

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const existingSave = await Save.findOne({
      video: videoId,
      user: req.user._id,
    });

    if (existingSave) {
      return res.status(200).json({
        message: "Video already saved",
        saved: true,
      });
    }

    await Save.create({
      video: videoId,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Video saved successfully",
      saved: true,
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

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    await Save.findOneAndDelete({
      video: videoId,
      user: req.user._id,
    });

    return res.status(200).json({
      message: "Video removed from saved",
      saved: false,
    });
  } catch (error) {
    console.error(
      "Unsave Video Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to remove saved video",
    });
  }
};

const getSaveStatus = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    const savedVideo = await Save.findOne({
      video: videoId,
      user: req.user._id,
    });

    return res.status(200).json({
      saved: Boolean(savedVideo),
    });
  } catch (error) {
    console.error(
      "Get Save Status Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch save status",
    });
  }
};

const getSavedVideos = async (req, res) => {
  try {
    const saves = await Save.find({
      user: req.user._id,
    })
      .populate({
        path: "video",
        populate: {
          path: "owner",
          select: "username fullName avatar",
        },
      })
      .sort({
        createdAt: -1,
      });

    const videos = saves
      .filter((save) => save.video)
      .map((save) => save.video);

    return res.status(200).json({
      videos,
    });
  } catch (error) {
    console.error(
      "Get Saved Videos Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch saved videos",
    });
  }
};

export {
  saveVideo,
  unsaveVideo,
  getSaveStatus,
  getSavedVideos,
};