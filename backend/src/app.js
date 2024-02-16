const express = require("express");

const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const { userRouter } = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests",
});
//middleware

app.use(rateLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users",userRouter);
app.use("/api/seed",seedRouter);
//client side error handling
app.use((req, res, next) => {
  //   createError(404, "page not found");
  //   next();
  next(createError(404, "route not found"));
});

//server side error handling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
