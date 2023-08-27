const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    exercise_type: {
      type: String,
    },
    exercise_series: {
      type: Number,
      required: true,
    },
    exercise_repetions: {
      type: [Number],
      required: true,
    },
    exercise_weight: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
