const { express, api_prefix } = require("./index");
const validateFindTreasureRequest = require("../middlewares/validators/findTreasureValidator");
const validateClaimTreasureRequest = require("../middlewares/validators/claimTreasureValidator");
const authorizeRequest = require("../middlewares/validators/authorizationValidator");
const treasureController = require("../controllers/treasureController");

treasureRouter = express.Router();

treasureRouter.use(api_prefix, authorizeRequest);

treasureRouter.post(
  `${api_prefix}/treasures`,
  [validateFindTreasureRequest.validate],
  treasureController.findTreasure
);
treasureRouter.post(
  `${api_prefix}/treasures/claim/`,
  [validateClaimTreasureRequest.validate],
  treasureController.claimTreasure
);

module.exports = treasureRouter;
