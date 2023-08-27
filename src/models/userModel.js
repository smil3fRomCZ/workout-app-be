const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidV4 } = require("uuid");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
    },
    password: {
      type: String,
      minLength: 8,
    },
    age: {
      type: Number,
    },
    googleId: {
      type: String,
      unique: true,
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
    user_type: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Before save to DB, hash password(for new users) and generate activation_link
userSchema.pre("save", async function (next) {
  let userData = this;
  try {
    if (!userData.isNew) {
      return next();
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // hash password before save to DB
    // If user come from 3rd party service skip pw procedure
    if (!userData.googleId) {
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPassword;
    }
    userData.activation_link = uuidV4();
    return next();
  } catch (error) {
    return next(error);
  }
});

// Compare user provide password and stored one in DB
userSchema.methods.isPasswordValid = async function (
  userInputPassword,
  userStoredPassword
) {
  return await bcrypt.compare(userInputPassword, userStoredPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
