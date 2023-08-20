const ApiError = require("../services/errorHandler/apiErrorFormatter");
const UserService = require("../services/user/UserService");
const mongoose = require("mongoose");

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ records: users.length, data: users });
    } catch (error) {
      next(error);
    }
  }

  async getUserByID(req, res, next) {
    const { userId } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError("Cast to ObjectId failed", 400);
      }
      const user = await UserService.getUserByID(userId);
      res.status(200).json({ status: "success", message: user });
    } catch (error) {
      next(error);
    }
  }

  // Register new user
  async createUser(req, res, next) {
    const userData = req.body;
    try {
      await UserService.createUser(userData);
      res.status(200).json({ status: "success", message: "User created" });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      res.status(200).json({ message: "Create user" });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req, res, next) {
    try {
      res.status(200).json({ message: "Create user" });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      res.status(200).json({ message: "Update user" });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      res.status(200).json({ message: "Delete user" });
    } catch (error) {
      next(error);
    }
  }

  async activateUser(req, res, next) {
    const { activation_link } = req.params;
    try {
      if (!activation_link) {
        throw new ApiError("Missing activation link", 400);
      }
      await UserService.activateUser(activation_link);
      res
        .status(200)
        .json({ status: "success", message: "User account activated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
