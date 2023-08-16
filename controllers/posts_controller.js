const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try

  {
  const newpost= await Post.create(
    {
      content: req.body.content,
      user: req.user._id, // Assuming req.user contains the logged-in user's information
    });
     console.log("Post created successfully:", post);
    return res.redirect("back");
  }
  catch
  {
return res.redirect("back");
  }
};
