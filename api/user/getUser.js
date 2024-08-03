getUser = (Router, getUserService) => {
    const router = Router();

    router
      .get('/:id', (req, res) => {
        return getUserService(req, res, req.params.id);
      })

    return router;
}

module.exports = getUser