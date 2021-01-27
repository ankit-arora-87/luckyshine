const tokenService = require("../services/tokenService");

class userController {
  static authenticateUser = (req, res) => {
    var user = res.locals.loggedInUser;
    var token = tokenService.generateAccessToken(user);
    res.json({ token: token });
  };
}

module.exports = userController;
