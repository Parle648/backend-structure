const postUser = (Router, postUseService) => {
    const router = Router();

    router
      .post('/', (req, res) => {
        return postUseService(req, res)
      })
    
    return router;
};

module.exports = postUser