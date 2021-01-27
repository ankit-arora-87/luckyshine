var supertest = require("supertest");
var assert = require("assert");
const api_prefix = "/api/v1";

const app = "http://localhost:7000";
const server = require("request");

module.exports = {
  supertest,
  app,
  assert,
  api_prefix,
  server
};
