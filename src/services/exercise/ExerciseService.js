const Exercise = require("../../models/exerciseModel");

class ExerciseService {
  static userPopulateProjection = ["_id", "nick_name", "age"];
  static exerciseProjection = [
    "_id",
    "exercise_name",
    "exercise_body_part",
    "exercise_series",
    "exercise_repetions",
    "exercise_weight",
  ];

  static async getAllExercises() {
    try {
      const exercises = await Exercise.find().populate(
        "user_id",
        this.userPopulateProjection
      );
      return exercises;
    } catch (error) {
      throw error;
    }
  }

  static async getExerciseById(exerciseId) {
    try {
      const exercise = await Exercise.findById(
        exerciseId,
        this.exerciseProjection
      );
      return exercise;
    } catch (error) {
      throw error;
    }
  }

  static async createExercise(exerciseInputData) {
    try {
      await Exercise.create(exerciseInputData);
    } catch (error) {
      throw error;
    }
  }

  static async deleteExercise(exerciseId) {
    try {
      await Exercise.deleteOne({ _id: exerciseId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ExerciseService;
