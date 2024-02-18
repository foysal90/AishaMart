const multer = require("multer");

const {
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  UPLOAD_USER_IMG_DIRECTORY,
} = require("../config");
const createError = require("http-errors");

const userStorage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, UPLOAD_USER_IMG_DIRECTORY);
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error("File type is not allowed"), false);
  }
  cb(null, true);
};

const uploadUserImage = multer({
  storage: userStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

module.exports = uploadUserImage;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: function (req, file, cb) {
//     const extname = path.extname(file.originalname);
//     cb(
//       null,
//       Date.now() + "_" + file.originalname.replace(extname, "") + extname
//     );
//   },
// });

// if (!file.mimetype.startsWith('image/')) {
//   return cb(new error('Only image files are allowed'), false)

// }
// if (file.size > MAX_FILE_SIZE) {
//   return cb(new error("file size exceeds the max limits"), false);
// }
// cb(null, true);
