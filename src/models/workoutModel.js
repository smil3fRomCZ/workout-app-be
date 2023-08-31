const mongoose = require("mongoose");
const User = require("./userModel");
const Exercise = require("./exerciseModel");
const { Schema } = mongoose;

const workoutSchema = new Schema({
  user_data: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  exercises: [Exercise.schema],
  start_time: {
    type: Date,
  },
  finish_time: {
    type: Date,
  },
  fitness_center: {
    type: String,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
