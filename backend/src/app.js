const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
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

app.get("/", (req, res) => {
  res.send("server is running ");
});
app.get("/products", (req, res) => {
  res.send("products are loading");
});
app.post("/products", (req, res) => {
  res.send("products are posting");
});
app.get("/user", (req, res) => {
  res.status(200).send({ name: "Aisha" });
});

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
