class UserController {
  static async getAllUsers(req, res, next) {
    try {
      res.status(200).json({ nummberOfRecords: 0, data: "Get all users" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
