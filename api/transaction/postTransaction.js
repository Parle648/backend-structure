const SCHEMAS = require("../../common/const/schemas");
const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const postTransaction = (Router, postTransactionService) => {
    const router = Router();

    router
      .post('/', 
      validateBody(SCHEMAS.TRASACTION.POST),
      tokenValidation(TOKEN_VALIDATION_TYPE.IS_ADMIN), 
      (req, res) => {
        return postTransactionService(req, res)
      })

    return router;
};

module.exports = postTransaction;