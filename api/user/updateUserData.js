const updateUserData = (Router) => {
    const router = Router();

    router
      .put('/:id', (req, res) => {
        return res.send({message: 'user was successfully updated'})
      })

    return router;
}

module.exports = updateUserData;