require("dotenv").config();
const port = process.env.PORT || 3001;
const dataBaseURL = process.env.DB_URL || "mongodb://localhost:27017/AishaMart";

module.exports = { port, dataBaseURL };
