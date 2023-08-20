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
         req.flash("success", "Commented");
        res.redirect("back");
      } catch (err) {
        res.redirect("back");
      }
    }
  } catch (err) {}
};

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      if (comment.user == req.user.id) {
        let postid = comment.post;
        await Comment.deleteOne({ _id: req.params.id });
        await Post.findByIdAndUpdate(postid, {
          $pull: {
            comments: req.params.id,
          },
        });
      }
    }
    res.redirect("back");
  } catch (err) {
    console.log("Error in deleting the post");
    res.redirect("back");
  }
};
