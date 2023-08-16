const mongoose = require("mongoose");
const User=require('../models/user');
const Comment = require("../models/comment");
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User, // Assuming there's a 'User' model
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Comment,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
