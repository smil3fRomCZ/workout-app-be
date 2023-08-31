const workoutController = require("../controllers/workoutController");
const userSessionCheck = require("../middleware/sessionAuthentification/sessionAuthentificationCheck");

const workoutRouter = require("express").Router();

workoutRouter
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(userSessionCheck, workoutController.createWorkout);

module.exports = workoutRouter;
