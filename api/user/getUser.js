getUser = (Router, id) => {
    const router = Router();

    router
      .get('/:id', (req, res) => {
        console.log(123);
        console.log(123);
        return res.send({message: `get user with id "UUID"`})
      })

    return router;
}

module.exports = getUser