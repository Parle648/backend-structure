const postUser = (Router) => {
    const router = Router();

    router
      .post('/', (req, res) => {
        return res.send({message: 'user created'})
      })
    
    return router;
};

module.exports = postUser