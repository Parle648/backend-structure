const SCHEMAS = require("../../common/const/schemas");
const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const modifyEvent = (Router, modifyService) => {
    const router = Router();

    router
      .put('/:id', 
        validateBody(SCHEMAS.EVENT.PUT),
        tokenValidation(TOKEN_VALIDATION_TYPE.IS_ADMIN),
        (req, res) => {
        return modifyService(req, res)
      })

    return router;
};

module.exports = modifyEvent;