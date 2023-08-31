const exerciseRouter = require("express").Router();

const exerciseController = require("../controllers/exerciseController");
const requestValidator = require("../middleware/requestValidator/requestValidator");
const requestTemplate = require("../middleware/requestValidator/requestTemplate");

exerciseRouter
  .route("/")
  .get(exerciseController.getAllExercises)
  .post(
    requestValidator(requestTemplate.createExercise),
    exerciseController.createExercise
  );

exerciseRouter.route("/:exerciseId").get(exerciseController.getExerciseByID);

module.exports = exerciseRouter;
