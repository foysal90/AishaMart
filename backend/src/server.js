const app = require("./app");
const connectDB = require("./config/db");
const { port } = require("./secret");

app.listen(port, async () => {
  console.log(port, "is running fine");
  await connectDB();
});
