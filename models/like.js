const mongoose = require("mongoose");
const User = require("../models/user");
const Comment = require("../models/comment");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    likeable: {
      type: mongoose.Schema.ObjectId,
      required: true, // Fix typo here
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true, // Fix typo here
      enum: ["Post", "Comment"], // Fix enum values here
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
