const userRouter = require("express").Router();

const requestValidator = require("../middleware/requestValidator/requestValidator");
const requestTemplate = require("../middleware/requestValidator/requestTemplate");
const UserController = require("../controllers/userControllers");
const userSessionCheck = require("../middleware/sessionAuthentification/sessionAuthentificationCheck");

userRouter
  .route("/")
  .get(UserController.getAllUsers)
  .post(
    requestValidator(requestTemplate.registrationRequest),
    UserController.createUser,
  );

userRouter
  .route("/activate-account/:activation_link")
  .get(UserController.activateUser);

userRouter
  .route("/login-user")
  .post(
    requestValidator(requestTemplate.loginRequest),
    UserController.loginUser,
  );

userRouter.route("/logout-user").get(UserController.logoutUser);

userRouter
  .route("/account")
  .get(userSessionCheck, UserController.getUserAccount);

userRouter
  .route("/:userId")
  .get(UserController.getUserByID)
  .patch(
    userSessionCheck,
    requestValidator(requestTemplate.updateRequest),
    UserController.updateUser,
  )
  .delete(userSessionCheck, UserController.deleteUser);

module.exports = userRouter;
