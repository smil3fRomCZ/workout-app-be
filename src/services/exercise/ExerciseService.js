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

  static async updateExercise(exerciseId, userId, newData) {
    try {
      const exercise = await Exercise.findById(exerciseId);
      if (exercise.user_id._id.toString() !== userId) {
        throw new ApiError(
          "You are not authorized to update this exercise. Pls contact administrator",
          403
        );
      }
      await exercise.updateOne(newData);
    } catch (error) {
      throw error;
    }
  }

  static async deleteExercise(exerciseId, userId) {
    try {
      const exercise = await Exercise.findById(exerciseId);
      if (!exercise) {
        throw new ApiError("No such exercise to delete", 400);
      }
      // Check if id within exercise is same like id from user who sent request
      if (exercise?.user_id._id.toString() !== userId) {
        throw new ApiError(
          "You are not authorized to delete this exercise. Pls contact administrator",
          403
        );
      }
      // Check if exercise if also in workout collection, if not than remove only exercise
      const workouts = await Workout.findOne({ user_data: userId });
      if (!workouts) {
        return await exercise.deleteOne();
      }

      for (let i = 0; i < workouts.exercises.length; i++) {
        if (workouts.exercises[i]._id.toString() === exerciseId) {
          let indexToDelete = workouts.exercises.findIndex(
            (element) => element._id === exerciseId
          );
          // TODO: When FE wil be connected check if INDEX work correct
          workouts.exercises.splice(indexToDelete, 1);
          await workouts.save();
          await exercise.deleteOne();
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ExerciseService;
