import mongoose from "mongoose";

import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";

const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    const comments = await Comment.find({
      video: videoId,
    })
      .populate(
        "user",
        "username fullName avatar"
      )
      .sort({
        createdAt: -1,
      });

    const formattedComments = comments.map(
      (comment) => ({
        ...comment.toObject(),

        isOwner: req.user?._id
          ? req.user._id.toString() ===
            comment.user?._id?.toString()
          : false,
      })
    );

    return res.status(200).json({
      comments: formattedComments,
    });
  } catch (error) {
    console.error(
      "Get Comments Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { content } = req.body;

    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    if (!content?.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
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

    const comment = await Comment.create({
      content: content.trim(),
      video: videoId,
      user: req.user._id,
    });

    const populatedComment =
      await Comment.findById(comment._id).populate(
        "user",
        "username fullName avatar"
      );

    return res.status(201).json({
      message: "Comment added successfully",

      comment: {
        ...populatedComment.toObject(),
        isOwner: true,
      },
    });
  } catch (error) {
    console.error(
      "Add Comment Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.isValidObjectId(commentId)) {
      return res.status(400).json({
        message: "Invalid comment ID",
      });
    }

    const comment =
      await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (
      comment.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to delete this comment",
      });
    }

    await Comment.findByIdAndDelete(
      commentId
    );

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Comment Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to delete comment",
    });
  }
};

export {
  getComments,
  addComment,
  deleteComment,
};