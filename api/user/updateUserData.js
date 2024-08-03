const SCHEMAS = require("../../common/const/schemas");
const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const updateUserData = (Router, updateUserService) => {
    const router = Router();

    router
      .put('/:id', 
        validateBody(SCHEMAS.USER.UPDATE), 
        tokenValidation(TOKEN_VALIDATION_TYPE.ORDINARY), 
        (req, res) => {
          return updateUserService(req, res)
        })

    return router;
}

module.exports = updateUserData;