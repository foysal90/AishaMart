const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const fs = require("fs").promises;
const { findWithId, deleteWithId } = require("../services/findItem");
const { deleteImage } = require("../helper/deleteImage");
const { createJWT } = require("../helper/jsonWebToken");
const { jwtActivationKey } = require("../secret");

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
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    return successResponse(res, {
      statusCode: 200,
      success: true,
      message: "user were returned ",
      payload: { user },
    });
  } catch (error) {
    //checking invalid mongoose id

    next(error);
  }
};
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;
    deleteImage(userImagePath);

    //making sure none of the admin is deleted
    await deleteWithId(User, id, { isAdmin: false });
    return successResponse(res, {
      statusCode: 200,
      success: true,
      message: "user was deleted successfully ",
    });
  } catch (error) {
    //checking invalid mongoose id

    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(
        409,
        "user already exists with this email, please log in or use an different email to register a new user"
      );
    }
    //create jwt
    const jwtToken = createJWT(
      { name, email, password, phone },
      jwtActivationKey,
      "10m"
    );

    //prepare email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
      <h2> Hello ${name} ! </h2>
      <p> Please click here to <a href=" "> activate your account </a></p>
      `,
    };
    //console.log(jwtToken);
    // const newUser = {
    //   name,
    //   email,
    //   password,
    //   phone,
    // };

    return successResponse(res, {
      statusCode: 200,
      message: "user created successfully",
      payload: { jwtToken },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, deleteUserById, register };
