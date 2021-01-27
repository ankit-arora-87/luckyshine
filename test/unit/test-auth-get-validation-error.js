const { supertest, assert, api_prefix, app } = require("../../test-config");

var payload = { email: "", password: "" };

exports.get_route_error = function(done) {
  supertest(app)
    .post(`${api_prefix}/auth`)
    .send(payload)
    .expect(404)
    .end(function(err, response) {
      assert.ok(err);
      return done();
    });
};

exports.get_validation_error = function(done) {
  supertest(app)
    .post(`${api_prefix}/auth`)
    .send(payload)
    .expect(422)
    .end(done);
};
