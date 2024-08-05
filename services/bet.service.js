const winston = require("winston");
const database = require("../db/db");
const jwt = require("jsonwebtoken");

const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});

const betService = {
    post: async (req, res) => {
        let token = req.headers['authorization'].replace('Bearer ', '');
        var tokenPayload = jwt.decode(token, process.env.JWT_SECRET);

        let userId = tokenPayload.id;
        try {
            const bodyDTO = req.body;
            
            const user = await database.user.getOne(bodyDTO.user_id)
            
            if (user.status >= 400) {
                return res.status(400).send({error: 'User does not exist'})
            }
            
            if (+user.balance < +bodyDTO.bet_amount) {
                return res.status(400).send({error: 'Not enough balance'})
            }
            
            const [event] = await database.event.getOne(bodyDTO.event_id);
            
            if (!event) {
                return res.status(404).send({error: 'Event not found'})
            }

            const odds = await database.odds.getOne(event.odds_id)

            if (odds.status >= 400) {
                return res.status(404).send({error: 'Odds not found'})
            }

            let multiplier;
            switch (bodyDTO.prediction) {
                case 'w1':
                    multiplier = odds.home_win;
                    break;
                case 'w2':
                    multiplier = odds.away_win;
                    break;
                case 'x':
                    multiplier = odds.draw;
                    break;
                default:
                    return res.status(404).send({error: 'Invalid prediction value'})
            }

            const postedBet = await database.bet.post(bodyDTO, multiplier, event, user);

            const currentBalance = user.balance - bodyDTO.bet_amount;

            if (currentBalance) {
                await database.user.update(userId, { balance: currentBalance })
            } else {
                return res.status(400).send({error: 'Not enough balance'})
            }

            ['bet_amount', 'event_id', 'away_team', 'home_team', 'odds_id', 'start_at', 'updated_at', 'created_at', 'user_id'].forEach(key => {
                const index = key.indexOf('_');
                const newKey = key.replace('_', '').split('').map((char, idx) => (idx === index ? char.toUpperCase() : char)).join('');
                postedBet[newKey] = postedBet[key];
                delete postedBet[key];
            });

            return postedBet.status >= 400 
              ? res.status(postedBet.status).send({error: postedBet.error})
              : res.send({ ...postedBet, currentBalance })
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }
    }
}

module.exports = betService