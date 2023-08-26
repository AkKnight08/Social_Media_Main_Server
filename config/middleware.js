module.exports.setFlash = function (req, res, next) {
  // Store flash messages in res.locals.flash
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };

  next(); // Continue to the next middleware or route handler
};
