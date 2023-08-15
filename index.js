const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: false })); // Added the { extended: false } option
app.use(cookieParser());
app.use(express.static("assets"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", require("./routes")); // Use routes from the './routes' directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Use path.join to correctly set the views directory

app.listen(port, function (err) {
  if (err) {
    console.log("Error in connecting to the server:", err); // Log the actual error
    return;
  }
  console.log("Server connected successfully to port:", port);
});
