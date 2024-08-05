const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const getStats = (Router, getStatsService) => {
    const router = Router();

    router
      .get('/', 
      tokenValidation(TOKEN_VALIDATION_TYPE.IS_ADMIN),
      (req, res) => {
        return getStatsService(req, res)
      })

    return router;
};

module.exports = getStats;