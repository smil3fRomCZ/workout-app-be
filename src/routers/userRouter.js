const userRouter = require("express").Router();

const requestValidator = require("../middleware/requestValidator/requestValidator");
const requestTemplate = require("../middleware/requestValidator/requestTemplate");
const UserController = require("../controllers/userControllers");
const {
  checkJwtAuthorization,
} = require("../middleware/checkJwtAuthorization/checkJwtAuthorization");

userRouter
  .route("/")
  .get(UserController.getAllUsers)
  .post(
    requestValidator(requestTemplate.registrationRequest),
    UserController.createUser
  );

userRouter
  .route("/activate-account/:activation_link")
  .get(UserController.activateUser);

userRouter
  .route("/login-user")
  .post(
    requestValidator(requestTemplate.loginRequest),
    UserController.loginUser
  );

userRouter
  .route("/account")
  .get(checkJwtAuthorization, UserController.getUserAccount);

userRouter
  .route("/:userId")
  .get(UserController.getUserByID)
  .patch(
    checkJwtAuthorization,
    requestValidator(requestTemplate.updateRequest),
    UserController.updateUser
  )
  .delete(checkJwtAuthorization, UserController.deleteUser);

module.exports = userRouter;
