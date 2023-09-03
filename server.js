const app = require("./src/app");

const connectToMongo = require("./src/database/mongoConnect");
const { PORT } = require("./src/config/configuration");

const server = app.listen(PORT, async () => {
  connectToMongo();
  console.log(`Server is listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
