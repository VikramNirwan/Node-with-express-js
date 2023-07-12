const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
// impoer app from index.js

const app = require("./index");
// Create a server
const port = 3000;
app.listen(port, () => {
  console.log("server has started...");
});
