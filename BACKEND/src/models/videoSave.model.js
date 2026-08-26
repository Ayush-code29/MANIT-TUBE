import mongoose from "mongoose";

const videoSaveSchema = new mongoose.Schema(
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

videoSaveSchema.index(
  { video: 1, user: 1 },
  { unique: true }
);

const VideoSave = mongoose.model(
  "VideoSave",
  videoSaveSchema
);

export default VideoSave;