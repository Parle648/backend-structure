const database = require("../db/db");

const transactionService = {
    postTransacrtion: async (req, res) => {
        const postedTransaction = await database.transaction.post(req.body);

        return postedTransaction.status >= 300
          ? res.status(postedTransaction.status).send({error: postedTransaction.error})
          : res.send(postedTransaction)
    }
}

module.exports = transactionService;