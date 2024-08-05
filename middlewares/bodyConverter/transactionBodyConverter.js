const transactionBodyConverter = () => {
    return (req, res, next) => {
        req.body.card_number = req.body.cardNumber;
        delete req.body.cardNumber;
        req.body.user_id = req.body.userId;
        delete req.body.userId;

        next()
    }
}

module.exports = transactionBodyConverter