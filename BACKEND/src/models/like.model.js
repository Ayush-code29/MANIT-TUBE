import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
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

// One user can like a video only once
likeSchema.index(
  { video: 1, user: 1 },
  { unique: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like;