const Exercise = require("../../models/exerciseModel");
const Workout = require("../../models/workoutModel");
const ApiError = require("../error/apiErrorFormatter");

class ExerciseService {
  static userPopulateProjection = ["_id", "nick_name", "age"];

  static exerciseProjection = [
    "_id",
    "user_id",
    "exercise_name",
    "exercise_body_part",
    "exercise_series",
    "exercise_repetions",
    "exercise_weight",
    "exercise_popularity",
  ];

  static async getAllExercises() {
    const exercises = await Exercise.find().populate(
      "user_id",
      this.userPopulateProjection,
    );
    return exercises;
  }

  static async getExerciseById(exerciseId) {
    const exercise = await Exercise.findById(
      exerciseId,
      this.exerciseProjection,
    );
    return exercise;
  }

  static createExercise = async (exerciseInputData) => Exercise.create(exerciseInputData);

  static async updateExercise(exerciseId, userId, newData) {
    const exercise = await Exercise.findById(exerciseId);
    if (exercise?.user_id._id.toString() !== userId) {
      throw new ApiError(
        "You are not authorized to update this exercise. Pls contact administrator",
        403,
      );
    }
    // TODO:Update also in workout collection or refactor workout model as REF
    await exercise.updateOne(newData);
  }

  static async deleteExercise(exerciseId, userId) {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      throw new ApiError("No such exercise to delete", 400);
    }
    // Check if id within exercise is same like id from user who sent request
    if (exercise?.user_id._id.toString() !== userId) {
      throw new ApiError(
        "You are not authorized to delete this exercise. Pls contact administrator",
        403,
      );
    }
    // Check if exercise if also in workout collection, if not than remove only exercise
    const workouts = await Workout.findOne({ user_data: userId });
    if (!workouts) {
      return exercise.deleteOne();
    }
    for (let i = 0; i < workouts.exercises.length; i += 1) {
      if (workouts.exercises[i]._id.toString() === exerciseId) {
        const indexToDelete = workouts.exercises.findIndex(
          (element) => element._id === exerciseId,
        );
        // TODO: When FE wil be connected check if INDEX work correct
        workouts.exercises.splice(indexToDelete, 1);
      }
    }
    await workouts.save();
    return exercise.deleteOne();
  }
}

module.exports = ExerciseService;
