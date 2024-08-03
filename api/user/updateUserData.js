const SCHEMAS = require("../../common/const/schemas");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");
const tokenValidation = require("../../middlewares/tokenValidation/tokenValidation");

const updateUserData = (Router, updateUserService) => {
    const router = Router();

    router
      .put('/:id', 
        (req, res, next) => validateBody(req, res, next, SCHEMAS.USER.UPDATE), 
        (req, res, next) => tokenValidation(req, res, next), 
        (req, res) => {
          return updateUserService(req, res)
        })

    return router;
}

module.exports = updateUserData;