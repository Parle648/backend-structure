getUser = (Router, userService) => {
    const router = Router();

    router
      .get('/:id', (req, res) => {
        return userService(req, res, req.params.id);
      })

    return router;
}

module.exports = getUser