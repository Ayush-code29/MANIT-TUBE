import mongoose from "mongoose";

const videoLikeSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

videoLikeSchema.index(
  { video: 1, user: 1 },
  { unique: true }
);

const VideoLike = mongoose.model(
  "VideoLike",
  videoLikeSchema
);

export default VideoLike;