// Data source: https://www.kulturistika.com/magazin/databaze-cviku?allArticlesTags=1

const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseTypeModel = new Schema({
  body_part: {
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
    required: true,
  },
  exercise_name: {
    type: String,
    required: true,
  },
});

const ExerciseType = mongoose.model("ExerciseType", exerciseTypeModel);

module.exports = ExerciseType;
