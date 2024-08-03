const postEvent = (Router) => {
    const router = Router();

    router
      .post('/', (req, res) => {
        return res.send({message: `event was created successfully`})
      })

    return router;
};

module.exports = postEvent;