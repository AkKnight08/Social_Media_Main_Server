const express = require("express");
const Router = express.Router();

const homeController = require("../controllers/home_controller");
console.log("Router Loaded");
Router.get("/", homeController.home);
Router.use("/users", require("./users"));
module.exports = Router;
