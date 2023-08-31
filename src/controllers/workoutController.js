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
      next(new ApiError(error.message, error.statusCode));
    }
  }

  async createWorkout(req, res, next) {
    try {
      const { user_data, exercise, fitness_center } = req.body;
      await WorkoutService.createWorkout(user_data, exercise, fitness_center);
      res.status(200).json({ status: "success", message: "Workout created" });
    } catch (error) {
      next(new ApiError(error.message, error.statusCode));
    }
  }
}

module.exports = new WorkoutController();
