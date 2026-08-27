import mongoose from "mongoose";

import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";

/*
|--------------------------------------------------------------------------
| SUBSCRIBE
|--------------------------------------------------------------------------
*/

const subscribeChannel = async (req, res) => {
  try {
    const { channelId } = req.params;

    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({
        message: "Invalid channel ID",
      });
    }

    const subscriberId = req.user._id;

    // User cannot subscribe to himself
    if (
      subscriberId.toString() ===
      channelId.toString()
    ) {
      return res.status(400).json({
        message: "You cannot subscribe to yourself",
      });
    }

    // Check channel exists
    const channel = await User.findById(channelId);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    // Check existing subscription
    const existingSubscription =
      await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId,
      });

    if (existingSubscription) {
      const subscriberCount =
        await Subscription.countDocuments({
          channel: channelId,
        });

      return res.status(200).json({
        subscribed: true,
        subscriberCount,
        message: "Already subscribed",
      });
    }

    await Subscription.create({
      subscriber: subscriberId,
      channel: channelId,
    });

    const subscriberCount =
      await Subscription.countDocuments({
        channel: channelId,
      });

    return res.status(201).json({
      subscribed: true,
      subscriberCount,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error(
      "Subscribe Channel Error:",
      error
    );

    // Handle duplicate key race condition
    if (error.code === 11000) {
      const subscriberCount =
        await Subscription.countDocuments({
          channel: req.params.channelId,
        });

      return res.status(200).json({
        subscribed: true,
        subscriberCount,
        message: "Already subscribed",
      });
    }

    return res.status(500).json({
      message: "Failed to subscribe",
    });
  }
};

/*
|--------------------------------------------------------------------------
| UNSUBSCRIBE
|--------------------------------------------------------------------------
*/

const unsubscribeChannel = async (req, res) => {
  try {
    const { channelId } = req.params;

    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({
        message: "Invalid channel ID",
      });
    }

    await Subscription.findOneAndDelete({
      subscriber: req.user._id,
      channel: channelId,
    });

    const subscriberCount =
      await Subscription.countDocuments({
        channel: channelId,
      });

    return res.status(200).json({
      subscribed: false,
      subscriberCount,
      message: "Unsubscribed successfully",
    });
  } catch (error) {
    console.error(
      "Unsubscribe Channel Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to unsubscribe",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SUBSCRIPTION STATUS
|--------------------------------------------------------------------------
|
| This endpoint is public because logged-out
| users should still be able to see subscriber
| count.
|
*/

const getSubscriptionStatus = async (
  req,
  res
) => {
  try {
    const { channelId } = req.params;

    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({
        message: "Invalid channel ID",
      });
    }

    const channel = await User.findById(
      channelId
    ).select("_id username fullName avatar");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    const subscriberCount =
      await Subscription.countDocuments({
        channel: channelId,
      });

    let subscribed = false;

    if (req.user?._id) {
      const existingSubscription =
        await Subscription.findOne({
          subscriber: req.user._id,
          channel: channelId,
        });

      subscribed = Boolean(
        existingSubscription
      );
    }

    return res.status(200).json({
      subscribed,
      subscriberCount,
    });
  } catch (error) {
    console.error(
      "Subscription Status Error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch subscription status",
    });
  }
};

export {
  subscribeChannel,
  unsubscribeChannel,
  getSubscriptionStatus,
};