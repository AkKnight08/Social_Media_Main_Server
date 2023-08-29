const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User, // Assuming there's a 'User' model
    },
    post: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Post,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
