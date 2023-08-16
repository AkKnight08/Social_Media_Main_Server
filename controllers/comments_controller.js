const express = require("express");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    console.log(req.body.post);
    const post = await Post.findById(req.body.post);
    if (post) {
      try {
        const comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });
        await post.comments.push(comment);
        await post.save();
        res.redirect('back');
      } catch (err) {
        res.redirect("back");
      }
    }
  } catch (err) {}
};
