const yup = require("yup");

module.exports = {
  registrationRequest: yup.object().shape({
    nick_name: yup.string().required().min(5).trim(),
    email: yup.string().email().trim().required(),
    password: yup.string().required().min(8).trim(),
  }),
  loginRequest: yup.object().shape({
    email: yup.string().email().trim().required(),
    password: yup.string().min(8).trim().required(),
  }),
  updateRequest: yup.object().shape({
    email: yup.string().email(),
    first_name: yup.string(),
    last_name: yup.string(),
    age: yup.number(),
  }),
  createExercise: yup.object().shape({
    exercise_series: yup.number().required(),
    exercise_repetions: yup.array().of(yup.number()).required(),
    exercise_weight: yup.array().of(yup.number()).required(),
  }),
};
