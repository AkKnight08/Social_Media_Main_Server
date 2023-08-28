const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "akshaykumarknight@gmail.com",
    pass: "pkdyanwhgzdyrntg",
  },
});

let renderTemplate = async (data, relativePath) => {
  try {
    const template = await ejs.renderFile(
      path.join(__dirname, "../views/mailers", relativePath),
      data
    );
    return template;
  } catch (err) {
    console.log("Error in Rendering Data", err);
    throw err;
  }
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
