const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  try {
    // Use the `await` keyword to asynchronously fetch the posts from the database
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate("user") // populates the user property for each post
      .populate({
        path: "comments", // specifies the path of the comments property
        populate: {
          path: "user", // specifies the path of the user property in the comments property
        },
      })
      .exec();
    const user = await User.find({});
    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: user,
    });
  } catch (err) {
    // Handle the error by logging it and redirecting back
    console.error("Error fetching posts:", err);
    return res.redirect("back");
  }
};
