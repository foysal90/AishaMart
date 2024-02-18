const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUserById,
  register,
  activateUserAccount,
  updateUserById,
} = require("../controllers/userController");

const { validateUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const uploadUserImage = require("../middlewares/uploadFile");
const userRouter = express.Router();
userRouter.post(
  "/register",
  uploadUserImage.single("image"),
  validateUserRegistration,
  runValidation,
  register
);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/:id", uploadUserImage.single("image"), updateUserById);

module.exports = { userRouter };
