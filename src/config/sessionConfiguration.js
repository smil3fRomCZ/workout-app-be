const MongoStore = require("connect-mongo");

const { DB_LINK, session } = require("./configuration");

const sessionStore = MongoStore.create({ mongoUrl: DB_LINK });

module.exports = {
  sessionOptions: {
    secret: session.SESSION_SECRET,
    cookie: { maxAge: parseInt(session.SESSION_COOKIE_MAXAGE, 10), httpOnly: true },
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
  },
};
