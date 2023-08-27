// Data source: https://www.kulturistika.com/magazin/databaze-cviku?allArticlesTags=1

const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseTemplate = new Schema(
  {
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
    exercise_name: {
      type: String,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ExerciseTemplate = mongoose.model("Exercise_Template", exerciseTemplate);

module.exports = ExerciseTemplate;
