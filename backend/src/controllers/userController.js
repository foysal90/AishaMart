const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    //using reg exp for seach
    const searchRegExp = new RegExp(search, "i"); // 'i' for case-insensitive

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };
    const users = await User.find(filter, options)
      //pagination implementing
      .limit(limit)
      .skip((page - 1) * page);
    //counting total number of pages to display in front end

    const count = await User.find(filter).countDocuments();
    if (!users) {
      throw createError(404, "no users were found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Successfully users were returned ",
      payload: {
        users,
        //pagination for front end
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await User.findById(id, options);
    if (!user) {
      throw createError(404, "user does not exist with this id");
    }
    return successResponse(res, {
      success: true,
      message: "user were returned ",
      payload: { user },
    });
  } catch (error) {
    //checking invalid mongoose id
    if (error instanceof mongoose.Error) {
      next(createError(400, "invalid user Id"));
      return;
    }
    next(error);
  }
};

module.exports = { getUsers, getUser };
