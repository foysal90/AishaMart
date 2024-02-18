const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultImagePath } = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minLength: [3, "Min length must be 3 characters"],
      maxLength: [30, "Max length  can not be exceeded 30 characters"],
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => {
          const regexPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return regexPattern.test(v);
        },
        message: "Please Enter a valid Email",
      },
    },
    password: {
      type: String,
      required: [true, "user password is required"],

      minLength: [6, "Password  must be  at least 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: Buffer,
      contentType: String,
    },
    address: {
      type: String,
      // required: [true, "user address is required"],
    },
    phone: {
      type: String,
      // required: [true, "user phone is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); //timestamps will provide created at and updated at

const User = model("users", userSchema); //users will be collection name in db
module.exports = User;
