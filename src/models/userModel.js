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
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
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
    // hash password
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
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
