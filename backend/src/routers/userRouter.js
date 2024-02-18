const express = require("express");
const {
  getUsers,

  getUserById,
  deleteUserById,
  register,
  activateUserAccount,
} = require("../controllers/userController");
const upload = require("../middlewares/uploadFile");
const { validateUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const userRouter = express.Router();
userRouter.post(
  "/register",
  upload.single("image"),
  validateUserRegistration,
  runValidation,

  register
);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = { userRouter };
