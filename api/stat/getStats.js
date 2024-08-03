const getStats = (Router) => {
    const router = Router();

    router
      .get('/', (req, res) => {
        return res.send({message: `stats`})
      })

    return router;
};

module.exports = getStats;