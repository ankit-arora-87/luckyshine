const tokenService = require("../../services/tokenService");
function authorizeRequest(req, res, next) {
  tokenService.validateAccessToken(req, res, next);
}

module.exports = authorizeRequest;
