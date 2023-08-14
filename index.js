const express = require("express");
const path = require("path");
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set("layout extractScripts", true);

const db = require("./config/mongoose");
const Contact = require("./models/cschema");
app.use('/',require('./routes'));

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in Connecting to the Server");
    return;
  } else console.log("Server Connected Sucessfully to the Port: ", port);
});