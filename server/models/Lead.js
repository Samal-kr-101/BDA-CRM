import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    companyName: String,
    clientName: String,
    email: String,
    phone: String,
    status: {
      type: String,
      default: "New",
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;