const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  try {
    const posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .exec();

    return res.status(200).json({
      message: "List of posts",
      posts: posts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
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

      return res.status(200).json({
        message: "Post and Associated Comments Deleted",
      });
    } else {
      return res.status(401).json({
        message: "You cannot delete this post",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
