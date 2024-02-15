const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("server is running ");
});
app.get("/products", (req, res) => {
  res.send("products are loading");
});
app.post("/products", (req, res) => {
  res.send("products are posting");
});

app.listen(port, () => {
  console.log(port, "is running fine");
});
