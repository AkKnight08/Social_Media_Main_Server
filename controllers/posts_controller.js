const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = async function (req, res) {
  try {
    const newpost = await Post.create({
      content: req.body.content,
      user: req.user._id, // Assuming req.user contains the logged-in user's information
    });
    req.flash('success','Post Published');
    return res.redirect("back");
  } catch {
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      // Ensure you compare the post.user.toString() with req.user.id.toString()
      if (post.user == req.user.id) {
        await Post.deleteOne({ _id: req.params.id }); // Use deleteOne() to delete a single document

        // Delete associated comments
        await Comment.deleteMany({ post: req.params.id });
          req.flash("success", "Post Deleted");
        return res.redirect("back"); // Redirect back to the previous page
      }
    }

    return res.redirect("back"); // Redirect back if post doesn't exist or user isn't authorized
  } catch (err) {
    console.log("Error in Deleting post:", err);
    return res.redirect("back");
  }
};
