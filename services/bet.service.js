const database = require("../db/db");
const jwt = require("jsonwebtoken");

const JWT_DATA = {
    type: "client",
    id: "0f290598-1b54-4a36-8c58-33caa7d08b5f"
  }

const betService = {
    post: async (req, res) => {
        let token = req.headers['authorization'];
        token = token.replace('Bearer ', '');
        var tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

        let userId = tokenPayload.id;
        try {
            req.body.event_id = req.body.eventId;
            req.body.bet_amount = req.body.betAmount;
            delete req.body.eventId;
            delete req.body.betAmount;
            req.body.user_id = userId;

            const postedBet = await database.bet.post({...req.body}, req.body.event_id);

            return postedBet.status >= 300 
            ? res.status(postedBet.status).send({error: postedBet.error})
            : res.send(postedBet)
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }
    }
}

module.exports = betService