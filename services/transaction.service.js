const database = require("../db/db");

const transactionService = {
    postTransacrtion: async (req, res) => {
        req.body.card_number = req.body.cardNumber;
        delete req.body.cardNumber;
        req.body.user_id = req.body.userId;
        delete req.body.userId;

        const postedTransaction = await database.transaction.post(req.body);

        return postedTransaction.status >= 300
          ? res.status(postedTransaction.status).send({error: postedTransaction.error})
          : res.send(postedTransaction)
    }
}

module.exports = transactionService;