const userRouter = require("express").Router();

const UserController = require("../controllers/userControllers");

userRouter.route("/").get(UserController.getAllUsers);

module.exports = userRouter;
