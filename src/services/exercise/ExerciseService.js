const Exercise = require("../../models/exerciseModel");
const ExerciseTemplate = require("../../models/exerciseTemplateModel");

class ExerciseService {
  static userPopulateProjection = ["_id", "nick_name", "age"];
  static exerciseTemplatePopulateProjection = [
    "exercise_name",
    "exercise_body_part",
  ];
  static exerciseProjection = [
    "_id",
    "exercise",
    "exercise_series",
    "exercise_repetions",
    "exercise_weight",
  ];

  static async getAllExercises() {
    try {
      const exercises = await Exercise.find()
        .populate("user_id", this.userPopulateFields)
        .populate("exercise", this.exerciseTemplatePopulateFields);
      return exercises;
    } catch (error) {
      throw error;
    }
  }

  static async getAllExerciseTemplates() {
    try {
      return await ExerciseTemplate.find();
    } catch (error) {
      throw error;
    }
  }

  static async getExerciseById(exerciseId) {
    try {
      const exercise = await Exercise.findById(
        exerciseId,
        this.exerciseProjection
      ).populate("exercise", this.exerciseTemplatePopulateProjection);
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

  static async createExerciseTemplate(exerciseInputData) {
    try {
      await ExerciseTemplate.create(exerciseInputData);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ExerciseService;
