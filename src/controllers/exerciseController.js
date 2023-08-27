const Exercise = require("../models/exerciseModel");

class ExerciseController {
  async getAllExercises(req, res, next) {
    try {
      const exercises = await Exercise.find().populate("user_id", [
        "_id",
        "nick_name",
        "age",
      ]);
      res
        .status(200)
        .json({ number_of_records: exercises.length, data: exercises });
    } catch (error) {
      next(error);
    }
  }

  async createExercise(req, res, next) {
    try {
      const exerciseData = req.body;
      await Exercise.create(exerciseData);
      res
        .status(200)
        .json({ status: "success", message: "Exercise created successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ExerciseController();
