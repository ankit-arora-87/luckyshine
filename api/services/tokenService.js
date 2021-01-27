const jwt = require("jsonwebtoken");

class tokenService {
  /**
   * To generate JWT from user object
   * @param {*} user
   */
  static generateAccessToken(user) {
    // expires after half and hour (1800 seconds = 30 minutes)
    var token = jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: "1800s"
    });
    return token;
  }

  /**
   * To validate user's provided JWT
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static validateAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).json({ message: "Unauthorized access!" }); // if there isn't any token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err != null && err.name == "JsonWebTokenError") {
        return res.status(401).send({ message: "Invalid Token!" });
      } else if (err != null && err.name == "TokenExpiredError") {
        return res.status(401).send({ message: "Token expired!" });
      }
      next();
    });
  }

  /**
   * To ger user info from JWT
   * @param {*} req
   */
  static getUserFromToken(req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401); // if there isn't any token
    return jwt.decode(token);
  }
}

module.exports = tokenService;
