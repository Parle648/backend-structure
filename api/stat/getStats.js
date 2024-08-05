const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");
const loggerMiddleware = require("../../middlewares/logger/loger");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const getStats = (Router, getStatsService) => {
    const router = Router();

    router
      .get('/', 
      loggerMiddleware(getStatsService),
      tokenValidation(TOKEN_VALIDATION_TYPE.IS_ADMIN),
      (req, res) => {
        return getStatsService(req, res)
      })

    return router;
};

module.exports = getStats;