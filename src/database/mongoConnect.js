const mongoose = require("mongoose");

const { DB_LINK } = require("../config/configuration");

const connectToMongo = async () => {
  await mongoose.connect(DB_LINK);
  console.log("Connected to DB");
};
module.exports = connectToMongo;
