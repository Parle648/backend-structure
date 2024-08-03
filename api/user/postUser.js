const SCHEMAS = require("../../common/const/schemas");
const { validateBody } = require("../../middlewares/requestValidation/schemaValidation");

const postUser = (Router, postUseService) => {
    const router = Router();

    router
      .post('/', validateBody(SCHEMAS.USER.POST), (req, res) => {
        return postUseService(req, res)
      })
    
    return router;
};

module.exports = postUser