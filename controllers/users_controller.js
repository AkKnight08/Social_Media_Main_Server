const User = require("../models/user");
module.exports.profile = async function (req, res) {
  try {
    if (req.cookies.user_id) {
      const user = await User.findById(req.cookies.user_id);
      if (user) {
        return res.render("profile", {
          title: "User-Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    } else {
      return res.redirect("/users/sign-in");
    }
  } catch (error) {
    console.error("Error in profile:", error);
    return res.redirect("/users/sign-in");
  }
};
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Sign in | SecretSocial",
  });
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Sign Up | SecretSocial",
  });
};

module.exports.create = async function (req, res) {
  // Check if the password and confirm password match
  if (req.body.password !== req.body.c_password) {
    console.log("Hi 36");
    return res.redirect("back");
  }

  // Check if a user with the given email already exists
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // If user doesn't exist, create a new user
      const newuser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      // If user with the email already exists, redirect to sign-in page
      return res.redirect("/users/sign-in");
    }
  } catch (err) {
    return res.redirect("/users/sign-in");
  }
};
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      res.cookie("user_id", user.id); // Set the user_id cookie
      return res.redirect("/users/profile");
    }
  } catch {
    return res.redirect("back");
  }
};
