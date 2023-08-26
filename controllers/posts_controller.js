const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      user: req.user._id, // Assuming req.user contains the logged-in user's information
    });
    req.flash("success", "Post Published");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err.message); // Use err.message to display the error message
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (post && post.user.toString() === req.user._id.toString()) {
      // Delete associated comments first
      await Comment.deleteMany({ post: req.params.id });

      // Delete the post itself
      await Post.deleteOne({ _id: req.params.id });

      req.flash("success", "Post and associated comments deleted");
    } else if (post) {
      req.flash("error", "You cannot delete this post!");
    } else {
      req.flash("error", "Post not found");
    }

    return res.redirect("back");
  } catch (err) {
    console.error(err); // Log the error for debugging
    req.flash("error", err.message);
    return res.redirect("back");
  }
};
