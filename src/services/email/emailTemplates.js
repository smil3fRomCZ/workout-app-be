/* eslint-disable arrow-body-style */
module.exports = {
  createRegistrationEmail: (recipient, activationLink) => {
    return {
      to: recipient,
      from: "jan.melicherik.dev@email.cz",
      subject: "Workout app - Confirm your registration",
      html: `
      <div>
            <p>Pls confirm your account</p>
            <a href="http://localhost:3000/api/v1/users/activate-account/${activationLink}">Confirm account</a>
      </div>
      `,
    };
  },
};
