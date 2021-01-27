const models = require("../../models");
const bcrypt = require("bcrypt");

class loginService {
  /**
   * To authenticate user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static authenticateUser(req, res, next) {
    const userDetail = models.User.getUserByEmail(req.body.email);

    userDetail
      .then(result => {
        if (result === null) {
          res.status(401).json({ message: "Unauthorized access!" });
        } else {
          bcrypt.compare(req.body.password, result.password, () => {
            var user = {
              id: result.id,
              name: result.name,
              email: result.email
            };
            res.locals.loggedInUser = user;
            return next();
          });
        }
      })
      .catch(error => {
        res.status(401).json({ message: "Unauthorized access!" });
      });
  }
}

module.exports = loginService;
