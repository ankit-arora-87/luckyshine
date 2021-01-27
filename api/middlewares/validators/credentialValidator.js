const loginService = require("../../services/loginService");

function validateCredentials(req, res, next) {
  loginService.authenticateUser(req, res, next);
}

module.exports = validateCredentials;
