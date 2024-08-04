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
    },
    putEvent: async (req, res) => {
        try {
            var eventId = req.params.id;

            const updatedEvent = await database.event.put(eventId, req.body);

            if (updatedEvent.id !== undefined) {
                return res.send(updatedEvent)
            } else {
                throw new Error(updatedEvent.error)
            }
        } catch (err) {
            createErrorObject(err);
            return;
        }
    }
}

module.exports = eventService;