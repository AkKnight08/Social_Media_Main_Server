const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
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

    const users = await User.find({}); // Changed "user" to "users" for clarity

    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: users, // Changed "user" to "users" for clarity
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.redirect("back");
  }
};
