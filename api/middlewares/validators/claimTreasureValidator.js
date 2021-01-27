const { body, check, validationResult } = require("express-validator");
const models = require("../../../models");

const generateValidators = () => [
  check("id", { id: "Invalid Treasure Id!" })
    .isInt()
    .custom(async id => {
      const existingTreasure = await models.Treasure.findOne({ where: { id } });
      if (!existingTreasure) {
        throw { id: "No Treasure exists!" };
      }
    }),
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
  check("distance", { distance: "Invalid distance" })
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
  models.Treasure.findNearByTreasures(
    req.body.latitude,
    req.body.longitude,
    req.body.distance,
    req.body.id
  )
    .then(treasureExistence =>
      models.Treasure.findTreasuresByPrizeValue(
        [Object.values(treasureExistence)[0].id],
        req.body.prize_value
      )
    )
    .then(treasurewithPrizeValue => {
      next();
    })
    .catch(error => {
      return res.status(422).json({
        errors: [
          {
            invalid_distance_range:
              "You are not allowed to claim this treasure!"
          }
        ]
      });
    });
};

module.exports = {
  validate: [generateValidators(), reporter]
};
