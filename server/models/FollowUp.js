import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    discussion: {
      type: String,
      required: true,
    },

    nextFollowUpDate: {
      type: String,
    },

    meetingStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const FollowUp = mongoose.model(
  "FollowUp",
  followUpSchema
);

export default FollowUp;