const { express, api_prefix } = require("./index");
const validateAuthRequest = require("../middlewares/validators/authValidator");
const validateCredentials = require("../middlewares/validators/credentialValidator");
const userController = require("../controllers/userController");
// const loginService = require("../services/loginService");

authRouter = express.Router();

authRouter.post(
  `${api_prefix}/auth`,
  [validateAuthRequest.validate, validateCredentials],
  userController.authenticateUser
);

module.exports = authRouter;
