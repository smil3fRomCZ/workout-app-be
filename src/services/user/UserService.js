const User = require("../../models/userModel");
const { sendRegistrationEmail } = require("../email/emailhandler");
const ApiError = require("../error/apiErrorFormatter");

class UserService {
  static USER_PROJECTION = [
    "nick_name",
    "email",
    "first_name",
    "last_name",
    "age",
  ];
  // Get all users where is_active = true
  static async getAllUsers() {
    try {
      return await User.find(
        { is_active: { $eq: true } },
        this.USER_PROJECTION
      );
    } catch (error) {
      throw error;
    }
  }

  // Get user by _id
  static async getUserByID(userId) {
    try {
      return await User.findById(userId, this.USER_PROJECTION);
    } catch (error) {
      throw error;
    }
  }

  /*
  Create new user registration from input form
  and send email to confirm your account.
  */
  static async createUser(userInputData) {
    try {
      const registeredUser = await User.create(userInputData);
      sendRegistrationEmail(
        registeredUser.email,
        registeredUser.activation_link
      );
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(email, userInputPassword) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError("No user found!", 404);
      }
      if (!(await user.isPasswordValid(userInputPassword, user.password))) {
        return "";
      }
      return user._id;
    } catch (error) {
      throw error;
    }
  }

  static async logoutUser() {}

  static async updateUser(userId, userUpdateData) {
    try {
      await User.findOne({ _id: userId }).updateOne(userUpdateData);
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser() {}

  /*
  Check if activation_link is correct and activate user account
  */
  static async activateUser(activation_link) {
    try {
      const user = await User.findOne({ activation_link });
      if (!user || user.is_activated === true) {
        throw new ApiError("Bad request", 400);
      }

      user.activation_link = null;
      user.is_activated = true;
      await user.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
