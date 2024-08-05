const betBodyConverter = () => {
    return (req, res, next) => {
        req.body.event_id = req.body.eventId;
        req.body.bet_amount = req.body.betAmount;
        delete req.body.eventId;
        delete req.body.betAmount;
        req.body.user_id = userId;

        next()
    }
}

module.exports = betBodyConverter