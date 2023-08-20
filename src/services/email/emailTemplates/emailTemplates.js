module.exports = {
  createRegistrationEmail: (recipient, activationLink) => {
    return {
      to: recipient,
      from: "jan.melicherik.dev@email.cz",
      subject: "Workout app - Confirm your registration",
      html: `
      <div>
            <p>Pls confirm your account</p>
            <a href="#${activationLink}">Confirm account</a>
      </div>
      `,
    };
  },
};
