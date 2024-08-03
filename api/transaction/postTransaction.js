const postTransaction = (Router) => {
    const router = Router();

    router
      .post('/', (req, res) => {
        return res.send({message: `create transaction`})
      })

    return router;
};

module.exports = postTransaction;