const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;

    if (req.query.type === "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    let existinglike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    if (existinglike) {
      likeable.likes.pull(existinglike._id);
      likeable.save();
     await Like.findOneAndDelete({
       likeable: req.query.id,
       onModel: req.query.type,
       user: req.user._id,
     });
      deleted = true;
    } else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    // for ajax
    // return res.status(200).json({
    //   message: "Successfully Liked",
    //   data: {
    //     deleted: deleted,
    //   },
    // });
    return res.redirect("back");
  } catch (err) {
    console.log("Error in Like_Controller", err);
    return res.status(500).json({
      message: "Internal Error in Likes Controller",
    });
  }
};
