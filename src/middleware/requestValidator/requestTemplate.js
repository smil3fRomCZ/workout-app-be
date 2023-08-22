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
};
