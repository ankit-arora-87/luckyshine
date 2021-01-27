const {
  supertest,
  assert,
  api_prefix,
  app,
  server
} = require("../../test-config");

exports.get_treasure_validation_error = function(done) {
  var payload = {};

  supertest(app)
    .post(`${api_prefix}/treasures`)
    .send(payload)
    .expect(401)
    .end(done);
};

exports.get_treasure_distance_error = function(done) {
  var payload = { email: "u1@luckyshine.xyz", password: "luckyshine001" };

  var treasure_payload = {
    id: 109,
    latitude: 1.31286055,
    longitude: 103.8545565,
    distance: 15,
    prize_value: 15
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
        .expect(422)
        .end(function(err, response) {
          assert.ok(response.body.errors instanceof Array);
          assert.ok(response.body.errors[0].distance === "Invalid distance!");
          return done();
        });
    }
  });
};

exports.get_treasure_lat_long_error = function(done) {
  var payload = { email: "u1@luckyshine.xyz", password: "luckyshine001" };

  var treasure_payload = {
    id: 109,
    latitude: 109.31286055,
    longitude: 193.8545565,
    distance: 10,
    prize_value: 15
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
        .expect(422)
        .end(function(err, response) {
          assert.ok(response.body.errors instanceof Array);
          assert.ok(response.body.errors[0].latitude === "Invalid Latitude!");
          assert.ok(response.body.errors[1].longitude === "Invalid Longitude!");
          return done();
        });
    }
  });
};
