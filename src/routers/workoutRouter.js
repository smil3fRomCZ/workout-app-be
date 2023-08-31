const workoutController = require("../controllers/workoutController");

const workoutRouter = require("express").Router();

workoutRouter
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(workoutController.createWorkout);

module.exports = workoutRouter;
