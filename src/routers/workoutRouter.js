const workoutRouter = require("express").Router();

const workoutController = require("../controllers/workoutController");
const userSessionCheck = require("../middleware/sessionAuthentification/sessionAuthentificationCheck");

workoutRouter
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(userSessionCheck, workoutController.createWorkout);

workoutRouter
  .route("/:workoutId/add-exercise")
  .post(userSessionCheck, workoutController.addExerciseToWorkout);

workoutRouter.route("/:workoutId").get(workoutController.getWorkoutByID);

module.exports = workoutRouter;
