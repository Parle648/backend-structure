const SCHEMAS = require("../../common/const/schemas");
const { validateParams } = require("../../middlewares/requestValidation/schemaValidation");

getUser = (Router, getUserService) => {
    const router = Router();

    router
      .get('/:id', validateParams(SCHEMAS.USER.GET_ONE), (req, res) => {
        return getUserService(req, res, req.params.id);
      })

    return router;
}

module.exports = getUser