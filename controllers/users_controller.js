const User = require("../models/user");
module.exports.profile = async function (req, res) {
  try {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // Use the user's ID from the session (passport sets this up)
      const userId = req.user._id;

      // Retrieve the user based on the ID
      const user = await User.findById(userId);
      const user2 = await User.findById(req.params.id);

      if (user) {
        return res.render("users_profile", {
          title: "User-Profile",
          user: user,
          profile_user: user2,
        });
      } else {
        console.log("1");
        return res.redirect("/users/sign-in");
      }
    } else {
      console.log("User not authenticated");
      return res.redirect("/users/sign-in");
    }
  } catch (err) {
    console.error("Error in profile:", err);
    return res.redirect("/users/sign-in");
  }
};

module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect("back");
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.error("Error in updating user:", err);
    return res.redirect("back");
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
  req.flash('success', 'Logged in Successfully');
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error logging out:", err);
    }
    req.flash("success", "Logged Out");
    return res.redirect("/users/sign-up");
  });
};
