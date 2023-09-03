/* eslint-disable consistent-return */
const mongoose = require("mongoose");

const ApiError = require("../services/error/apiErrorFormatter");
const UserService = require("../services/user/UserService");

class UserController {
  // Get all users where is_active = true
  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ number_of_records: users.length, data: users });
    } catch (error) {
      next(error);
    }
  }

  // Get user by object _id
  async getUserByID(req, res, next) {
    const { userId } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError("Cast to ObjectId failed", 400);
      }
      const user = await UserService.getUserByID(userId);
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "No user found" });
      }
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
      const { email, password } = req.body;
      const user = await UserService.loginUser(email, password);
      if (!user) {
        return res
          .status(400)
          .json({ status: "failed", message: "Wrong credentials" });
      }
      req.session.userId = user._id;
      return res.status(200).json({ status: "success", message: "User logged in" });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req, res, next) {
    try {
      req.session.destroy();
      res.clearCookie("connect.sid");
      res.status(203).json({ status: "success", message: "User logged out" });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { userId } = req.params;
      const userUpdateData = req.body;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError("Cast to ObjectId failed", 400);
      }
      if (req.session.userId !== userId) throw new ApiError("You dont have a permission to do that!", 401);
      const updateResult = await UserService.updateUser(userId, userUpdateData);
      if (updateResult > 0) {
        res
          .status(200)
          .json({ status: "success", data: "User updated successfully" });
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "Nothing to update here" });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError("Cast to ObjectId failed", 400);
      }
      if (req.session.userId !== userId) throw new ApiError("You dont have a permission to do that!", 401);
      const result = await UserService.deleteUser(userId);
      if (result.deletedCount === 0) {
        res.status(400).json({ status: "failed", message: "Bad request" });
      } else {
        req.session.destroy();
        res.clearCookie("connect.sid");
        res.status(203).json({ status: "success", message: "User deleted" });
      }
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

  // TODO:Test purpose for authorization - delete before release
  async getUserAccount(req, res, next) {
    try {
      res.status(200).json({ status: "success", message: "Account" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
