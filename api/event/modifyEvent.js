const modifyEvent = (Router) => {
    const router = Router();

    router
      .put('/:id', (req, res) => {
        return res.send({message: `event was successfully updated`})
      })

    return router;
};

module.exports = modifyEvent;