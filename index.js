const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/cschema");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", function (req, res) {
  Contact.find({})
    .then((clist) => {
      res.render("home", { title: "Welcome to Home", clist: clist });
    })
    .catch((err) => {
      console.log("Error in Fetching Contacts from DB: ", err);
      return res.redirect("back");
    });
});

app.get("/profile", function (req, res) {
  res.render("profile", { title: "Profile" });
});

app.post("/create", function (req, res) {
  Contact.create({
    name: req.body.name,
    roll: req.body.roll
  })
    .then((newcontact) => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in Creating the contact: ", err);
      return res.redirect("back");
    });
});

app.get("/dc/", async function (req, res) {
  try {
    let id = req.query.id;
    await Contact.findByIdAndDelete(id);
    return res.redirect("back");
  } catch (err) {
    console.log("Error in deleting Object: ", err);
    return res.redirect("back");
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in Connecting to the Server");
    return;
  } else console.log("Server Connected Sucessfully to the Port: ", port);
});
