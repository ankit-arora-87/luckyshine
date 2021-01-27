const { check, validationResult } = require("express-validator");

const generateValidators = () => [
  check("latitude", { latitude: "Invalid Latitude!" }).custom(latitude => {
    return (
      typeof latitude !== "string" &&
      isFinite(latitude) &&
      Math.abs(latitude) <= 90
    );
  }),
  check("longitude", { longitude: "Invalid Longitude!" }).custom(longitude => {
    return (
      typeof longitude !== "string" &&
      isFinite(longitude) &&
      Math.abs(longitude) <= 180
    );
  }),
  check("distance", { distance: "Invalid distance!" })
    .isInt()
    .isIn([1, 10]),
  check("prize_value", { prize_value: "Invalid prize value!" })
    .optional()
    .isInt()
    .custom(value => {
      if (value >= 10 && value <= 30) {
        return true;
      }
    })
];

const reporter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(422).json({
      errors: errorMessages
    });
  }
  next();
};

module.exports = {
  validate: [generateValidators(), reporter]
};
