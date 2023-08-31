const ExerciseService = require("../services/exercise/ExerciseService");
const ApiError = require("../services/error/apiErrorFormatter");
const { default: mongoose } = require("mongoose");

class ExerciseController {
  async getAllExercises(req, res, next) {
    try {
      const exercises = await ExerciseService.getAllExercises();
      res
        .status(200)
        .json({ number_of_records: exercises.length, data: exercises });
    } catch (error) {
      next(new ApiError(error.message, error.statusCode));
    }
  }

  async getExerciseByID(req, res, next) {
    try {
      const { exerciseId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
        throw new ApiError("Cast to ObjectId failed", 400);
      }
      const exercise = await ExerciseService.getExerciseById(exerciseId);
      res.status(200).json({ status: "success", data: exercise });
    } catch (error) {
      next(new ApiError(error.message, error.statusCode));
    }
  }

  async createExercise(req, res, next) {
    try {
      const exerciseData = req.body;
      await ExerciseService.createExercise(exerciseData);
      res
        .status(200)
        .json({ status: "success", message: "Exercise created successfully" });
    } catch (error) {
      next(new ApiError(error.message, error.statusCode));
    }
  }
}

module.exports = new ExerciseController();
