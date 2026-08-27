import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// One user can subscribe to a channel only once.
subscriptionSchema.index(
  {
    subscriber: 1,
    channel: 1,
  },
  {
    unique: true,
  }
);

const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema
);

export default Subscription;