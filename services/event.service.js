const database = require("../db/db");
const createErrorObject = require("../helpers/createErrorObject");

const eventService = {
    postEvent: async (req, res) => {
        try {
            req.body.odds.home_win = req.body.odds.homeWin;
            delete req.body.odds.homeWin;
            req.body.odds.away_win = req.body.odds.awayWin;
            delete req.body.odds.awayWin;

            const createdEvent = await database.event.post(req.body);

            return res.send({...createdEvent})
        } catch (err) {
            return createErrorObject(err);
        }
    }
}

module.exports = eventService;