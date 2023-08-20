const sendgrid = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = require("../../config/configuration");
const ApiError = require("../errorHandler/apiErrorFormatter");
const { createRegistrationEmail } = require("./emailTemplates/emailTemplates");

sendgrid.setApiKey(SENDGRID_API_KEY);

module.exports = {
  sendRegistrationEmail: (recipient, activationLink) => {
    sendgrid
      .send(createRegistrationEmail(recipient, activationLink))
      .then((response) => {
        console.log(`Email sent successfully: ${response[0].statusCode}`);
      })
      .catch((error) => {
        throw new ApiError(error.message, error.statusCode);
      });
  },
};
