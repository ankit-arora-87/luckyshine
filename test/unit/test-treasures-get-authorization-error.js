const { supertest, assert, api_prefix, app } = require("../../test-config");

exports.get_treasures_authorization_error = function(done) {
  var payload = {};

  supertest(app)
    .post(`${api_prefix}/treasures`)
    .send(payload)
    .expect(401)
    .end(function(err, response) {
      assert.ok(typeof response.body.message === "string");
      assert.ok(response.body.message === "Unauthorized access!");
      return done();
    });
};
