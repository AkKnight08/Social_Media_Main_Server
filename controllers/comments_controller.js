const express = require("express");
const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer= require('../mailers/comment_mailer');
module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      await post.save();

      // Populate the comment with the user's name and email address
       await comment
         .populate("user","name email")
         .then((populatedComment) => {
           commentMailer.newComment(populatedComment);
         });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment Created",
        });
      }

      req.flash("success", "Commented");
      res.redirect("back");
    }
  } catch (err) {
    console.error("Error in creating comment:", err);
    req.flash("error", "Error creating comment");
    res.redirect("back");
  }
};


module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment && comment.user.toString() === req.user._id.toString()) {
      const postid = comment.post;
      await Comment.deleteOne({ _id: req.params.id });
      await Post.findByIdAndUpdate(postid, {
        $pull: {
          comments: req.params.id,
        },
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Comment Deleted",
        });
      }

      req.flash("success", "Comment Deleted");
      return res.redirect("back");
    }

    req.flash("error", "You are not authorized to delete this comment.");
    res.redirect("back");
  } catch (err) {
    console.error("Error in deleting comment:", err);
    req.flash("error", "Error deleting comment");
    res.redirect("back");
  }
};
