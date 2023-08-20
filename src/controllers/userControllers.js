const UserService = require("../services/user/UserService");

class UserController {
  async getAllUsers(req, res, next) {
    try {
      res.status(200).json({ records: 0, data: "Get all users" });
    } catch (error) {
      next(error);
    }
  }

  async getUserByID(req, res, next) {
    try {
      res.status(200).json({ message: "Get user by ID" });
    } catch (error) {
      next(error);
    }
  }

  // Register new user
  async createUser(req, res, next) {
    const userData = req.body;
    try {
      await UserService.createUser(userData);
      res.status(200).json({ status: "success", message: "Create user" });
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
    try {
      res.status(200).json({ message: "Activate user" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
