const SCHEMAS = require("../../common/const/schemas");
const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");
const transactionBodyConverter = require("../../middlewares/bodyConverter/transactionBodyConverter");
const loggerMiddleware = require("../../middlewares/logger/loger");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const postTransaction = (Router, postTransactionService) => {
    const router = Router();

    router
      .post('/', 
      loggerMiddleware(postTransactionService),
      validateBody(SCHEMAS.TRASACTION.POST),
      tokenValidation(TOKEN_VALIDATION_TYPE.IS_ADMIN), 
      transactionBodyConverter(),
      (req, res) => {
        return postTransactionService(req, res)
      })

    return router;
};

module.exports = postTransaction;