const express = require("express");
const Router = express.Router();

const userController = require("../controllers/users_controller");
console.log("Router Loaded");
Router.get("/profile", userController.profile);
Router.get("/post", userController.post);
module.exports = Router;
