const User = require("../../models/userModel");
const { sendRegistrationEmail } = require("../email/emailhandler");

class UserService {
  static async getAllUser() {}
  static async getUserByID() {}

  static async createUser(userInputData) {
    try {
      const registeredUser = await User.create(userInputData);
      await sendRegistrationEmail(
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
}

module.exports = UserService;
