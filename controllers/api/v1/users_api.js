const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.status(420).json({
        message: "Invalid Username or Password",
      });
    }

    return res.status(200).json({
      message: "Sign in Successful. Here is your token. Please keep it safe.",
      data: {
        token: jwt.sign(user.toJSON(), "secretsocial", { expiresIn: "1h" }),
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
