const User = require("../../models/userModel");
const { sendRegistrationEmail } = require("../email/emailhandler");
const ApiError = require("../errorHandler/apiErrorFormatter");

class UserService {
  static async getAllUser() {}
  static async getUserByID() {}

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

  static async loginUser() {}
  static async logoutUser() {}
  static async updateUser() {}
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
