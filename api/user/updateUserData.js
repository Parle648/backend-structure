const updateUserData = (Router, updateUserService) => {
    const router = Router();

    router
      .put('/:id', (req, res) => {
        return updateUserService(req, res)
      })

    return router;
}

module.exports = updateUserData;