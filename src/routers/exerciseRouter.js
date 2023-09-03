const exerciseRouter = require("express").Router();

const exerciseController = require("../controllers/exerciseController");
const requestValidator = require("../middleware/requestValidator/requestValidator");
const requestTemplate = require("../middleware/requestValidator/requestTemplate");
const userSessionCheck = require("../middleware/sessionAuthentification/sessionAuthentificationCheck");

exerciseRouter
  .route("/")
  .get(exerciseController.getAllExercises)
  .post(
    userSessionCheck,
    requestValidator(requestTemplate.createExercise),
    exerciseController.createExercise,
  );

exerciseRouter
  .route("/:exerciseId")
  .get(exerciseController.getExerciseByID)
  .delete(userSessionCheck, exerciseController.deleteExercise)
  .patch(userSessionCheck, exerciseController.updateExercise);

module.exports = exerciseRouter;
