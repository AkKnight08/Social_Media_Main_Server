module.exports.setFlash = function (req, res, next) {
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next(); // Don't forget to call next() to proceed to the next middleware or route handler
};
