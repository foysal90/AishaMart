const multer = require("multer");
const path = require("path");
const createError = require("http-errors");


const {
  UPLOAD_USER_IMG_DIRECTORY,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} = require("../config");
const { error } = require("console");

//const storage = multer.memoryStorage();
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMG_DIRECTORY);
  },
  filename: function (req, file, cb) {
    //const extname = path.extname(file.originalname);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const fileFilter = (req, file, cb) => {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      return cb(new error("File type is not allowed"), false);
    }
    cb(null, true);
  };

  // if (!file.mimetype.startsWith('image/')) {
  //   return cb(new error('Only image files are allowed'), false)

  // }
  // if (file.size > MAX_FILE_SIZE) {
  //   return cb(new error("file size exceeds the max limits"), false);
  // }
  // cb(null, true);
};

const uploadUserImage = multer({
  storage: userStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

module.exports = uploadUserImage;
