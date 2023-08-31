const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    exercise_name: {
      type: String,
    },
    exercise_body_part: {
      type: String,
      enum: [
        "Biceps",
        "Břišní svaly",
        "Hýždě",
        "Lýtka",
        "Prsní svaly",
        "Ramena",
        "Spodní část těla",
        "Stehna",
        "Triceps",
        "Vrchní část těla",
        "Zádové svaly",
      ],
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
