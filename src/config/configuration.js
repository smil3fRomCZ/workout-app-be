module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  SENDGRID_API_KEY: process.env.API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_MAXAGE: process.env.JWT_MAXAGE,
  JWT_MAXAGE: process.env.JWT_MAXAGE,
  JWT_MAXAGE_MS: process.env.JWT_MAXAGE_MS,
  oauth: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  },
};
