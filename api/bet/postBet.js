const postBet = (Router) => {
    const router = Router();

    router
      .post('/', (req, res) => {
        return res.send({message: `bet was created successfully`})
      })

    return router;
};

module.exports = postBet;