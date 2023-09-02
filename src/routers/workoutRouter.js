const workoutController = require("../controllers/workoutController");
const userSessionCheck = require("../middleware/sessionAuthentification/sessionAuthentificationCheck");

const workoutRouter = require("express").Router();

workoutRouter
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(userSessionCheck, workoutController.createWorkout);

workoutRouter
  .route("/:workoutId/add-exercise")
  .post(userSessionCheck, workoutController.addExerciseToWorkout);

workoutRouter.route("/:workoutId").get(workoutController.getWorkoutByID);

module.exports = workoutRouter;
