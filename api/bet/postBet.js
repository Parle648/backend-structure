const SCHEMAS = require("../../common/const/schemas");
const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");
const betPostTokenValidation = require("../../middlewares/tokenValidation/betPostTokenValidation");

const postBet = (Router, postBetService) => {
    const router = Router();

    router
      .post('/', 
        validateBody(SCHEMAS.BET.POST), 
        betPostTokenValidation(TOKEN_VALIDATION_TYPE.ORDINARY), 
        (req, res) => {
        return postBetService(req, res)
      })

    return router;
};

module.exports = postBet;