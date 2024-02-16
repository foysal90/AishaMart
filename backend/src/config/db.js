const mongoose = require("mongoose");
const { dataBaseURL } = require("../secret");

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(dataBaseURL, options);
    console.log("connection to mongo db is successfully established");

    //handling error
    mongoose.connection.on("error", (error) => {
      console.error("connection error :", error);
    });
  } catch (error) {
    console.error("could not connect to db", error.toString());
  }
};

module.exports = connectDB;
