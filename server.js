const app = require("./src/app");

const connectToMongo = require("./src/database/mongoConnect");
const { PORT } = require("./src/config/configuration");

app.listen(PORT, async () => {
  connectToMongo();
  console.log(`Server is listening on port ${PORT}`);
});
