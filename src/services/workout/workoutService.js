const Workout = require("../../models/workoutModel");
const Exercise = require("../../models/exerciseModel");
const ApiError = require("../error/apiErrorFormatter");

class WorkoutService {
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
  static async getAllWorkouts() {
    try {
      const workouts = await Workout.find()
        .populate("user_data", this.userPopulateProjection)
        .populate("exercises", this.exerciseProjection)
        .populate({ path: "exercises", populate: { path: "exercises" } });
      return workouts;
    } catch (error) {
      throw error;
    }
  }

  static async getWorkoutByID(workoutId) {
    try {
      const workout = await Workout.findById(workoutId);
      if (!workout) {
        throw new ApiError("No workout found", 400);
      }
      return workout;
    } catch (error) {
      throw error;
    }
  }

  static async createWorkout(user_data, exercise, fitness_center) {
    try {
      const userInput = {
        user_data,
        fitness_center,
      };
      const workout = await Workout.create(userInput);
      workout.exercises.push(await Exercise.findById(exercise, "-user_id"));
      await workout.save();
    } catch (error) {
      throw error;
    }
  }

  static async addExerciseToWorkout(userId, workoutId, exerciseId) {
    try {
      const workout = await Workout.findById(workoutId);
      if (!workout.user_data._id.toString() === userId) {
        throw new ApiError("You are not authorized to add exercise", 401);
      }
      console.log(exerciseId);
      const exerciseToAdd = await Exercise.findById({ _id: exerciseId });
      workout.exercises.push(exerciseToAdd);
      await workout.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WorkoutService;
