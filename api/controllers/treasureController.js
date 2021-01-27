const treasureService = require("../services/treasureService");

class treasureController {
  static findTreasure = (req, res) => {
    treasureService.findNearByTreasures(req, res);
  };
  static claimTreasure = (req, res) => {
    treasureService.claimTreasure(req, res);
  };
}

module.exports = treasureController;
