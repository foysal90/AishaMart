require("dotenv").config();
const port = process.env.PORT || 3001;
const dataBaseURL = process.env.DB_URL || "mongodb://localhost:27017/AishaMart";

const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/home.jpg";

const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || "tereBinAmin_aymaraiya_2019a2021s2023";

const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const frontendURL = process.env.CLIENT_URL;
const uploadDir = process.env.UPLOAD_FILE || "public/images/users";

module.exports = {
  port,
  dataBaseURL,
  defaultImagePath,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  frontendURL,
  uploadDir,
};
