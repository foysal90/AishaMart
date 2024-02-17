const express = require("express");
const {
  getUsers,

  getUserById,
  deleteUserById,
  register,
} = require("../controllers/userController");
const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = { userRouter };
