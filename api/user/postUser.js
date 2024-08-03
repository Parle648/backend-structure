const SCHEMAS = require("../../common/const/schemas");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");

const postUser = (Router, postUseService) => {
    const router = Router();

    router
      .post('/', (req, res, next) => validateBody(req, res, next, SCHEMAS.USER.POST), (req, res) => {
        return postUseService(req, res)
      })
    
    return router;
};

module.exports = postUser