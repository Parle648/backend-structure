const SCHEMAS = require("../../common/const/schemas");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const updateUserData = (Router, updateUserService) => {
    const router = Router();

    router
      .put('/:id', 
        validateBody(SCHEMAS.USER.UPDATE), 
        tokenValidation(), 
        (req, res) => {
          return updateUserService(req, res)
        })

    return router;
}

module.exports = updateUserData;