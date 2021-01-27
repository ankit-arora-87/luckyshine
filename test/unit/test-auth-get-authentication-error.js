const { supertest, assert, api_prefix, app } = require("../../test-config");

exports.get_authentication_error = function(done) {
  var payload = { email: "u1@luckyshine.com", password: "luckyshine001" };

  supertest(app)
    .post(`${api_prefix}/auth`)
    .send(payload)
    .expect(401)
    .end(done);
};
