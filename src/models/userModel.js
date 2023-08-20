const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  nick_name: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  is_activated: {
    type: Boolean,
    default: false,
  },
  activation_link: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
