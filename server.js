const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const authRouter = require("./api/routes/auth");
const treasureRouter = require("./api/routes/treasure");
env.config();
const app = express();
app.use(express.json());
app.use(cors());

// To handle incoming bad request
app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON");
    res.status(400).json({ message: "Bad Request" });
  }
  next();
});
app.use([authRouter, treasureRouter]);
app.listen(process.env.PORT || 7000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
module.exports = app;
