const {
  supertest,
  assert,
  api_prefix,
  app,
  server
} = require("../../test-config");

exports.get_treasure_success = function(done) {
  var payload = { email: "u1@luckyshine.xyz", password: "luckyshine001" };

  var treasure_payload = {
    id: 109,
    latitude: 1.31286055,
    longitude: 103.8545565,
    distance: 10,
    prize_value: 10
  };

  const options = {
    url: app + api_prefix + "/auth",
    json: true,
    body: payload
  };

  server.post(options, (err, res, body) => {
    if (!err) {
      supertest(app)
        .post(`${api_prefix}/treasures`)
        .set("Authorization", "Bearer " + body.token)
        .send(treasure_payload)
        .expect(200)
        .end(function(err, response) {
          assert.ok(typeof response.body.total === "number");
          assert.ok(response.body.data instanceof Array);
          return done();
        });
    }
  });
};
