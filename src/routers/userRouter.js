const userRouter = require("express").Router();

const requestValidator = require("../services/requestValidator/requestValidator");
const {
  registrationRequest,
} = require("../services/requestValidator/requestTemplate");
const UserController = require("../controllers/userControllers");

userRouter
  .route("/")
  .get(UserController.getAllUsers)
  .post(requestValidator(registrationRequest), UserController.createUser);

module.exports = userRouter;
