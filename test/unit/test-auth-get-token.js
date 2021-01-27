const { supertest, assert, api_prefix, app } = require("../../test-config");

var payload = { email: "", password: "" };

exports.get_token = function(done) {
  var payload = { email: "u1@luckyshine.xyz", password: "luckyshine001" };

  supertest(app)
    .post(`${api_prefix}/auth`)
    .send(payload)
    .expect(200)
    .end(function(err, response) {
      assert.ok(response);
      assert.ok(response instanceof Object);
      return done();
    });
};
