const mongoose = require("mongoose");

const createError = require("http-errors");
const User = require("../models/userModel");

const findWithId = async (Model, id, options = {}) => {
  try {
    const item = await Model.findById(id, options);
    if (!item) {
      throw createError(404, `${Model.modelName} does not exist with this id`);
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "invalid user Id"));
    }
    throw error;
  }
};
// const deleteWithId = async (Model, id, next) => { // Added 'Model' and 'next' as parameters
//   try {
//     const item = await Model.findByIdAndDelete(id);
//     if (!item) {
//       return next(createError(404, `Item does not exist with this ID`)); // Use next to pass error to error handler
//     }
//     return item;
//   } catch (error) {
//     if (error.name === 'CastError') { // More specific error check
//       return next(createError(400, "Invalid user ID")); // Use next to pass error to error handler
//     }
//     next(error); // Pass other types of errors to the error handler
//   }
// };

const deleteWithId = async (Model,id, options) => {
  try {
    const item = await Model.findByIdAndDelete(id);
    if (!item) {
      throw createError(404, `item does not exist with this id`);
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
