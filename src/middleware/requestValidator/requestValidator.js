const ApiError = require("../../services/error/apiErrorFormatter");

module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  };
};
