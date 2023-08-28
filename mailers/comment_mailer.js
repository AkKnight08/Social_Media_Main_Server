const nodemailer = require("../config/nodemailer");

exports.newComment = async function (comment) {
  try {
    const htlmString = await nodemailer.renderTemplate(
      { comment: comment },
      "/comments/new_comment.ejs"
    );

    const info = await nodemailer.transporter.sendMail({
      from: "akshaykumarknight@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published",
      html: htlmString,
    });

    console.log("Mail Delivered");
    return;
  } catch (err) {
    console.log("Error in comment_mailer", err);
    return;
  }
};
