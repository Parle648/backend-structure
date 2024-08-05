const SCHEMAS = require("../../common/const/schemas");
const loggerMiddleware = require("../../middlewares/logger/loger");
const { validateParams } = require("../../middlewares/requestValidation/schemaValidation");

getUser = (Router, getUserService) => {
    const router = Router();

    router
      .get('/:id', loggerMiddleware(getUserService), validateParams(SCHEMAS.USER.GET_ONE), (req, res) => {
        return getUserService(req, res, req.params.id);
      })

    return router;
}

module.exports = getUser