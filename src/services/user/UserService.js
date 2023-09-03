const User = require("../../models/userModel");
const Exercise = require("../../models/exerciseModel");
const Workout = require("../../models/workoutModel");
const { sendRegistrationEmail } = require("../email/emailhandler");
const ApiError = require("../error/apiErrorFormatter");

class UserService {
  // List of fields, which will be return
  static USER_PROJECTION = [
    "nick_name",
    "email",
    "first_name",
    "last_name",
    "age",
  ];

  // Get all users where is_active = true
  static getAllUsers = async () => User.find({ is_active: { $eq: true } }, this.USER_PROJECTION);

  // Get user by _id
  static getUserByID = async (userId) => User.findById(userId, this.USER_PROJECTION);

  /*
  Create new user registration from input form
  and send email to confirm your account.
  */
  static async createUser(userInputData) {
    const registeredUser = await User.create(userInputData);
    sendRegistrationEmail(
      registeredUser.email,
      registeredUser.activation_link,
    );
  }

  static async loginUser(email, userInputPassword) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError("No user found!", 404);
    }
    if (!(await user.isPasswordValid(userInputPassword, user.password))) {
      return "";
    }
    return user._id;
  }

  static async updateUser(userId, userUpdateData) {
    const updateResult = await User.findOne({ _id: userId }).updateOne(
      userUpdateData,
    );
    return updateResult.modifiedCount;
  }

  static async deleteUser(userId) {
    const exercise = await Exercise.findOne({ user_id: userId });
    if (!exercise) return User.deleteOne({ _id: userId });
    if (exercise) {
      const workout = await Workout.findOne({ user_data: userId });
      await exercise.deleteOne();
      await workout.deleteOne();
    }
    return User.deleteOne({ _id: userId });
  }

  /*
  Check if activation_link is correct and activate user account
  */
  static async activateUser(activation_link) {
    const user = await User.findOne({ activation_link });
    if (!user || user.is_activated === true) {
      throw new ApiError("Bad request", 400);
    }

    user.activation_link = null;
    user.is_activated = true;
    await user.save();
  }
}

module.exports = UserService;
