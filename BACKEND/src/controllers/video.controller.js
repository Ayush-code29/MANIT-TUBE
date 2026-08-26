import mongoose from "mongoose";
import Video from "../models/video.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const uploadVideo = async (req, res) => {
  try {
    console.log(req.files);

    const { title, description, duration } = req.body;

    if (!title || !description || !duration) {
      return res.status(400).json({
        message: "Title, description and duration are required",
      });
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
      return res.status(400).json({
        message: "Video file is required",
      });
    }

    if (!thumbnailLocalPath) {
      return res.status(400).json({
        message: "Thumbnail is required",
      });
    }

    const videoFile = await uploadOnCloudinary(
      videoLocalPath,
      "video"
    );

    if (!videoFile) {
      return res.status(500).json({
        message: "Video upload failed",
      });
    }

    const thumbnail = await uploadOnCloudinary(
      thumbnailLocalPath,
      "image"
    );

    if (!thumbnail) {
      return res.status(500).json({
        message: "Thumbnail upload failed",
      });
    }

    const video = await Video.create({
      title,
      description,
      duration,
      videoFile: videoFile.secure_url,
      thumbnail: thumbnail.secure_url,
      owner: req.user._id,
      likes: [],
    });

    return res.status(201).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    console.log("Upload Video Error:", error);

    return res.status(500).json({
      message: "Something went wrong while uploading video",
    });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Number(req.query.limit) || 10,
      20
    );

    const skip = (page - 1) * limit;

    const videos = await Video.find({
      isPublished: true,
    })
      .populate(
        "owner",
        "username fullName avatar"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const totalVideos = await Video.countDocuments({
      isPublished: true,
    });

    const formattedVideos = videos.map((video) => ({
      ...video.toObject(),
      likesCount: video.likes?.length || 0,
    }));

    return res.status(200).json({
      message: "Videos fetched successfully",

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(
          totalVideos / limit
        ),
        totalVideos,
        limit,
      },

      videos: formattedVideos,
    });
  } catch (error) {
    console.log("Get Videos Error:", error);

    return res.status(500).json({
      message: "Failed to fetch videos",
    });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    const video = await Video.findOneAndUpdate(
      {
        _id: videoId,
        isPublished: true,
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    ).populate(
      "owner",
      "username fullName avatar"
    );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    return res.status(200).json({
      message: "Video fetched successfully",

      video: {
        ...video.toObject(),
        likesCount: video.likes?.length || 0,
      },
    });
  } catch (error) {
    console.log("Get Video Error:", error);

    return res.status(500).json({
      message: "Failed to fetch video",
    });
  }
};

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

    const video = await Video.findOneAndUpdate(
      {
        _id: videoId,
        isPublished: true,
        likes: {
          $ne: req.user._id,
        },
      },
      {
        $addToSet: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      }
    );

    if (!video) {
      return res.status(404).json({
        message: "Video not found or already liked",
      });
    }

    return res.status(200).json({
      message: "Video liked successfully",

      liked: true,

      likesCount: video.likes?.length || 0,
    });
  } catch (error) {
    console.error("Like Video Error:", error);

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

    const video = await Video.findOneAndUpdate(
      {
        _id: videoId,
        isPublished: true,
      },
      {
        $pull: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      }
    );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    return res.status(200).json({
      message: "Video unliked successfully",

      liked: false,

      likesCount: video.likes?.length || 0,
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
| LIKE STATUS
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

    const video = await Video.findOne({
      _id: videoId,
      isPublished: true,
    }).select("likes");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const liked = video.likes?.some(
      (userId) =>
        userId.toString() ===
        req.user._id.toString()
    );

    return res.status(200).json({
      liked,
      likesCount: video.likes?.length || 0,
    });
  } catch (error) {
    console.error(
      "Get Like Status Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to get like status",
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE VIDEO
|--------------------------------------------------------------------------
*/

const updateVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      isPublished,
    } = req.body;

    const video = req.video;

    if (title !== undefined) {
      video.title = title;
    }

    if (description !== undefined) {
      video.description = description;
    }

    if (isPublished !== undefined) {
      video.isPublished = isPublished;
    }

    await video.save();

    return res.status(200).json({
      message: "Video updated successfully",
      video,
    });
  } catch (error) {
    console.log("Update Video Error:", error);

    return res.status(500).json({
      message: "Failed to update video",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE VIDEO
|--------------------------------------------------------------------------
*/

const deleteVideo = async (req, res) => {
  try {
    const video = req.video;

    await Video.findByIdAndDelete(video._id);

    return res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.log("Delete Video Error:", error);

    return res.status(500).json({
      message: "Failed to delete video",
    });
  }
};

export {
  uploadVideo,
  getAllVideos,
  getVideoById,
  likeVideo,
  unlikeVideo,
  getLikeStatus,
  updateVideo,
  deleteVideo,
};