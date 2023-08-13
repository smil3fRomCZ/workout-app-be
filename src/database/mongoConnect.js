const mongoose = require("mongoose");

const { DB_LINK } = require("../config/configuration");

const connectToMongo = async () => {
  try {
    await mongoose.connect(DB_LINK);
    console.log("Connected to DB");
  } catch (err) {
    throw err;
  }
};
module.exports = connectToMongo;
