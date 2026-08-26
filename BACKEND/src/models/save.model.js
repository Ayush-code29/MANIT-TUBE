import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
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

saveSchema.index(
  { video: 1, user: 1 },
  { unique: true }
);

const Save = mongoose.model(
  "Save",
  saveSchema
);

export default Save;