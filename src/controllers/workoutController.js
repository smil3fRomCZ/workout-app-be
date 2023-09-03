const mongoose = require("mongoose");

const ApiError = require("../services/error/apiErrorFormatter");
const WorkoutService = require("../services/workout/workoutService");

class WorkoutController {
  async getAllWorkouts(req, res, next) {
    try {
      const workouts = await WorkoutService.getAllWorkouts();
      res
        .status(200)
        .json({ number_of_records: workouts.length, data: workouts });
    } catch (error) {
      next(error);
    }
  }

  async getWorkoutByID(req, res, next) {
    try {
      const { workoutId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        throw new ApiError("Cast to ObjectId failed", 400);
      }
      const workout = await WorkoutService.getWorkoutByID(workoutId);
      res.status(200).json({ status: "sucess", data: workout });
    } catch (error) {
      next(error);
    }
  }

  async createWorkout(req, res, next) {
    try {
      const { user_data, exercise, fitness_center } = req.body;
      await WorkoutService.createWorkout(user_data, exercise, fitness_center);
      res.status(200).json({ status: "success", message: "Workout created" });
    } catch (error) {
      next(error);
    }
  }

  async addExerciseToWorkout(req, res, next) {
    try {
      const { workoutId } = req.params;
      const exerciseId = req.body.exercise;
      const { userId } = req.session;
      if (!userId) {
        throw new ApiError("Your are not authorized to add exercise", 401);
      }
      await WorkoutService.addExerciseToWorkout(userId, workoutId, exerciseId);
      res.status(200).json({ status: "success", message: "Exercise added" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WorkoutController();
