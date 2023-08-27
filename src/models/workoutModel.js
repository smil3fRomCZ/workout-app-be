const mongoose = require("mongoose");
const { Schema } = mongoose;

const workoutSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  exercise_id: {
    type: Schema.Types.ObjectId,
    ref: "Exercise",
  },
  start_time: {
    type: Date,
  },
  finish_time: {
    type: Date,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
