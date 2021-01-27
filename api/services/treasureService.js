const models = require("../../models");
const tokenService = require("../services/tokenService");

class treasureService {
  /**
   * To find near by treasures
   * @param {*} req
   * @param {*} res
   */
  static findNearByTreasures(req, res) {
    const treasures = models.Treasure.findNearByTreasures(
      req.body.latitude,
      req.body.longitude,
      req.body.distance
    );
    this.getTreasures(treasures, req, res);
  }

  /**
   * To get treasures values
   * @param {*} treasures
   * @param {*} req
   * @param {*} res
   */
  static getTreasures(treasures, req, res) {
    treasures
      .then(result => {
        return req.body.prize_value != undefined
          ? this.getTreasuresByPrize(result, req, res)
          : this.getTreasureList(result, res);
      })
      .catch(error => {
        res.sendStatus(400);
      });
  }

  /**
   * To get treasures by prize value
   * @param {*} result
   * @param {*} req
   * @param {*} res
   */
  static getTreasuresByPrize(result, req, res) {
    if (result === null) {
      res.sendStatus(404);
    } else {
      var treasuresList = Object.values(result);
      var treasuresListIds = [];
      treasuresList.map(treasure => {
        treasuresListIds.push(treasure.id);
      }, treasuresList);
      var treasureIds = treasuresListIds.join(", ");
      const treasuresByPrize = models.Treasure.findTreasuresByPrizeValue(
        treasuresListIds,
        req.body.prize_value
      );
      treasuresByPrize
        .then(resultp => {
          if (resultp === null) {
            res.sendStatus(404);
          } else {
            var treasuresListIdsP = [];
            var treasuresListP = Object.values(resultp);
            treasuresListP.map(treasureId => {
              treasuresListIdsP.push(treasureId.treasureId);
            }, treasuresListP);

            var filtertreasuresList = treasuresList.filter(treasure => {
              var searchIndex = treasuresListIdsP.indexOf(treasure.id);
              if (searchIndex > -1) {
                treasure.distance = treasure.distance.toFixed(2);
                treasure.amount = treasuresListP[searchIndex].amt;
                return treasure;
              }
            });
            res.status(200).json({
              total: filtertreasuresList.length,
              data: filtertreasuresList
            });
          }
        })
        .catch(error => {
          res.sendStatus(400);
        });
    }
  }

  /**
   * To modiy treasure list
   * @param {*} result
   * @param {*} res
   */
  static getTreasureList(result, res) {
    var treasuresList = Object.values(result);
    treasuresList.map(treasure => {
      treasure.distance = treasure.distance.toFixed(2);
    }, treasuresList);
    res.status(200).json({
      total: treasuresList.length,
      data: treasuresList
    });
  }

  /**
   * To initiate claim treasure process
   * @param {*} req
   * @param {*} res
   */
  static claimTreasure(req, res) {
    const treasureMoneyValue = models.TreasureMoneyValue.getTreasureMoneyValue(
      req.body.id,
      req.body.prize_value
    );
    treasureMoneyValue
      .then(result => {
        if (result === null) {
          throw new Error("NO_TREASURE_EXISTS");
        }
        return this.claimTreasurePrize(req, res, result.id);
      })
      .then(claimResult => {
        var isError = claimResult instanceof Error;

        if (isError === true) {
          throw new Error("NO_TREASURE_EXISTS");
        } else {
          res.json({ message: "Treasure claimed successfully!" });
        }
      })
      .catch(error => {
        if (error.message === "NO_TREASURE_EXISTS") {
          res.json({
            message: "Treasure is not available to claim with this prize value!"
          });
        } else {
          res.json({ message: "You have already claimed this treasure!" });
        }
      });
  }

  /**
   * To claim treasure by prize value
   * @param {*} req
   * @param {*} res
   * @param {*} id
   */
  static claimTreasurePrize(req, res, id) {
    const userFromToken = tokenService.getUserFromToken(req);
    return models.UserTreasurePrize.claimTreasurePrize(
      userFromToken.id,
      id,
      req.body.prize_value
    );
  }
}
module.exports = treasureService;
