const SCHEMAS = require("../../common/const/schemas");
const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const postEvent = (Router, postEventService) => {
    const router = Router();

    router
      .post('/', 
        validateBody(SCHEMAS.EVENT.POST),
        tokenValidation(TOKEN_VALIDATION_TYPE.IS_ADMIN),
        (req, res) => {
        return postEventService(req, res)
      })

    return router;
};

module.exports = postEvent;