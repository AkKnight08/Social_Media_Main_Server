const express = require("express");
const env=require('./config/environment');
const logger=require('morgan');
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 9000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportlocal = require("./config/passport-local-strategy");
const passportJWT= require('./config/passport-jwt-strategy');
const passportGoogle= require('./config/passport-google-oauth2-strategy');
const MongoStore = require("connect-mongo");
const flash =require('connect-flash');
const custommware= require('./config/middleware');
const cors= require('cors');
const { Logger } = require("sass");
const io = require("socket.io")(3000);

io.on("connection", (socket) => {
  console.log(socket.id);
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(env.asset_path)); 
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(logger(env.morgan.mode,env.morgan.options));
app.use(cors());
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// Set up session middleware
app.use(
  session({
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/ss_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// Initialize passport and set authentication user
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(custommware.setFlash);
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in connecting to the server:", err);
    return;
  }
  console.log("Server connected successfully to port:", port);
});
