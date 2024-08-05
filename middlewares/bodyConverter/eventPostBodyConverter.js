const eventPostBodyConverter = () => {
    return (req, res, next) => {
        req.body.odds.home_win = req.body.odds.homeWin;
        delete req.body.odds.homeWin;
        req.body.odds.away_win = req.body.odds.awayWin;
        delete req.body.odds.awayWin;

        next()
    }
}

module.exports = eventPostBodyConverter