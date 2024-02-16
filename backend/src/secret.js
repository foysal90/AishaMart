require("dotenv").config();
const port = process.env.PORT || 3001;
const dataBaseURL = process.env.DB_URL || "mongodb://localhost:27017/AishaMart";

const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/home.jpg";

module.exports = { port, dataBaseURL, defaultImagePath };
