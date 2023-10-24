const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env= require('./environment');
let transporter = nodemailer.createTransport(env.smtp);

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
