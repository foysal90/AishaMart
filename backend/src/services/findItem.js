const mongoose = require("mongoose");
const User = require("../models/userModel");
const createError = require("http-errors");
const findWithId = async (id, options = {}) => {
  try {
    const item = await User.findById(id, options);
    if (!item) {
      throw createError(404, "item does not exist with this id");
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "invalid user Id"));
    }
    throw error;
  }
};
const deleteWithId = async (id) => {
  try {
    const item = await User.findByIdAndDelete(id, );
    if (!item) {
      throw createError(404, "item does not exist with this id");
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "invalid user Id");
    }
    throw error;
  }
};

module.exports = { findWithId, deleteWithId };
